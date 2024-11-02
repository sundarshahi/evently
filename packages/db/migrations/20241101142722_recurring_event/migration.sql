-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "created_by" TEXT NOT NULL DEFAULT 'system',
ADD COLUMN     "recurrence_end" TIMESTAMP(3),
ADD COLUMN     "recurrence_rule" TEXT;

-- CreateTable
CREATE TABLE "EventInstance" (
    "id" UUID NOT NULL,
    "parent_event_id" UUID NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,
    "created_by" TEXT NOT NULL DEFAULT 'system',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EventInstance_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EventInstance_id_key" ON "EventInstance"("id");

-- CreateIndex
CREATE INDEX "EventInstance_parent_event_id_idx" ON "EventInstance"("parent_event_id");

-- CreateIndex
CREATE INDEX "EventInstance_start_time_end_time_idx" ON "EventInstance"("start_time", "end_time");

-- CreateIndex
CREATE INDEX "Event_created_by_idx" ON "Event"("created_by");

-- CreateIndex
CREATE INDEX "Event_recurrence_end_idx" ON "Event"("recurrence_end");

-- AddForeignKey
ALTER TABLE "EventInstance" ADD CONSTRAINT "EventInstance_parent_event_id_fkey" FOREIGN KEY ("parent_event_id") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
