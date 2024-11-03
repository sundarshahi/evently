// @ts-nocheck

import { Job } from "bullmq";

import { dayjs } from "@/utils/dayjs";
import { createWorker } from "@/config/queue";
import { EventRepository } from "@/repositories/EventRepository";

console.log("Worker started!!");

function isOverlapping(local: any, fromDb: any): boolean {
  return local.startTime < fromDb.end_time && local.endTime > fromDb.start_time;
}

export const worker = createWorker("events", async (job: Job) => {
  const { parentEventId, recurrenceDates, startTime, endTime, createdBy } =
    job.data;

  console.log(`Processing job ID: ${job.id}`);
  const instancesToCreate = [];

  try {
    for (const date of recurrenceDates) {
      const currentStart = dayjs(date).toDate();
      const currentEnd = dayjs(date)
        .add(dayjs(endTime).diff(startTime, "minute"), "minute")
        .toDate();

      instancesToCreate.push({ startTime: currentStart, endTime: currentEnd });
    }

    const overlappingInstances =
      await EventRepository.findOverlappingEventsAndInstances(
        instancesToCreate
      );

    const instancesToInsert = instancesToCreate.filter(
      (local) =>
        !overlappingInstances.some((fromDb) => isOverlapping(local, fromDb))
    );

    if (instancesToInsert.length > 0) {
      const instances = instancesToInsert.map((instance) => ({
        parent_event_id: parentEventId,
        start_time: instance.startTime,
        end_time: instance.endTime,
        created_by: createdBy,
      }));
      await EventRepository.createManyEventInstance(instances);
      console.log(
        `${instancesToInsert.length} instances created successfully.`
      );
    } else {
      console.log("No instances were created due to overlapping events.");
    }

    await job.updateProgress({ message: "Job completed successfully" });
  } catch (error) {
    console.error(`Error in job ${job.id}: ${error}`);
    if (job) {
      const token = job.token!;
      try {
        await job.moveToFailed(error as any, token);
        console.log(`Job ${job.id} moved to failed with error: ${error}`);
      } catch (moveError) {
        console.error(
          `Failed to move job ${job.id} to failed queue:`,
          moveError
        );
      }
    } else {
      console.error("Failed job is undefined.");
    }
  }
});
worker.on("progress", (job: Job, progress: number | object) => {
  console.log(
    `Job progress for ID: ${job?.id}, progress:${progress.toString()}`
  );
});
worker.on("failed", (job: Job | undefined, error: Error) => {
  console.log(`Job failed for ID: ${job?.id}, Error: ${error.message}`);
});

worker.on("completed", (job: Job, returnvalue: any) => {
  console.log(
    `Job completed for ID: ${job?.id}, data:${JSON.stringify(returnvalue)}`
  );
});

worker.on("error", (error) => {
  console.error(`Worker encountered an error: ${error.message}`);
});
