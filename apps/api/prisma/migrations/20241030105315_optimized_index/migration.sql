-- CreateEnum
CREATE TYPE "RSVPStatus" AS ENUM ('accepted', 'declined', 'pending');

-- CreateTable
CREATE TABLE "Event" (
    "id" UUID NOT NULL,
    "title" VARCHAR(150) NOT NULL,
    "description" VARCHAR(500),
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,
    "time_zone" TEXT NOT NULL,
    "location" VARCHAR(255),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Participant" (
    "id" UUID NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "rsvp_status" "RSVPStatus" NOT NULL,
    "event_id" UUID NOT NULL,

    CONSTRAINT "Participant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Event_start_time_end_time_idx" ON "Event"("start_time", "end_time");

-- CreateIndex
CREATE UNIQUE INDEX "Participant_email_key" ON "Participant"("email");

-- CreateIndex
CREATE INDEX "Participant_event_id_rsvp_status_idx" ON "Participant"("event_id", "rsvp_status");

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
