-- CreateEnum
CREATE TYPE "TicketStatus" AS ENUM ('approved', 'rejected', 'pending');

-- CreateTable
CREATE TABLE "complaines" (
    "UniqueID" TEXT NOT NULL,
    "msgs" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "ticket_id" TEXT,

    CONSTRAINT "complaines_pkey" PRIMARY KEY ("UniqueID")
);

-- CreateTable
CREATE TABLE "tickets" (
    "UniqueID" TEXT NOT NULL,
    "category" VARCHAR(255) NOT NULL,
    "priority" INTEGER NOT NULL,
    "department" VARCHAR(255) NOT NULL,
    "draft_report" TEXT NOT NULL,
    "status" "TicketStatus" NOT NULL DEFAULT 'pending',
    "extracted_entites" JSONB NOT NULL,
    "confidence_score" TEXT NOT NULL,

    CONSTRAINT "tickets_pkey" PRIMARY KEY ("UniqueID")
);

-- CreateIndex
CREATE UNIQUE INDEX "complaines_ticket_id_key" ON "complaines"("ticket_id");

-- AddForeignKey
ALTER TABLE "complaines" ADD CONSTRAINT "complaines_ticket_id_fkey" FOREIGN KEY ("ticket_id") REFERENCES "tickets"("UniqueID") ON DELETE SET NULL ON UPDATE CASCADE;
