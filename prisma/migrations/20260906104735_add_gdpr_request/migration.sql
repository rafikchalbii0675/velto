-- CreateTable
CREATE TABLE "GdprRequest" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "shopDomain" TEXT NOT NULL,
    "customerId" TEXT,
    "customerEmail" TEXT,
    "payload" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GdprRequest_pkey" PRIMARY KEY ("id")
);
