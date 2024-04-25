-- CreateTable
CREATE TABLE "Room" (
    "id" SERIAL NOT NULL,
    "roomID" TEXT,
    "roomName" TEXT,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);
