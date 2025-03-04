/*
  Warnings:

  - You are about to drop the `message` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "message";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Direct_message" (
    "id" TEXT NOT NULL,
    "sender_id" TEXT NOT NULL,
    "receiver_id" TEXT,
    "message" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Direct_message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Group_message" (
    "id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sender_id" TEXT NOT NULL,
    "event_id" TEXT NOT NULL,

    CONSTRAINT "Group_message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ReceiverGM" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ReceiverGM_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ReceiverGM_B_index" ON "_ReceiverGM"("B");

-- AddForeignKey
ALTER TABLE "Direct_message" ADD CONSTRAINT "Direct_message_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Direct_message" ADD CONSTRAINT "Direct_message_receiver_id_fkey" FOREIGN KEY ("receiver_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Group_message" ADD CONSTRAINT "Group_message_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Group_message" ADD CONSTRAINT "Group_message_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ReceiverGM" ADD CONSTRAINT "_ReceiverGM_A_fkey" FOREIGN KEY ("A") REFERENCES "Group_message"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ReceiverGM" ADD CONSTRAINT "_ReceiverGM_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
