/*
  Warnings:

  - A unique constraint covering the columns `[roomID]` on the table `Room` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Room_roomID_key" ON "Room"("roomID");
