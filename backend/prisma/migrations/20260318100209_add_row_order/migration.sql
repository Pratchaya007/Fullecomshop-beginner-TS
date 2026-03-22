-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "amount" INTEGER,
ADD COLUMN     "currentcy" TEXT,
ADD COLUMN     "status" TEXT,
ADD COLUMN     "stripePaymentId" TEXT;
