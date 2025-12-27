-- CreateTable
CREATE TABLE "MaintenanceRequest" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "subject" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'New',
    "priority" TEXT NOT NULL DEFAULT 'Medium',
    "createdBy" TEXT NOT NULL,
    "team" TEXT NOT NULL,
    "maintenanceFor" TEXT NOT NULL DEFAULT 'Equipment',
    "equipment" TEXT,
    "workCenter" TEXT,
    "technician" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "duration" TEXT NOT NULL DEFAULT '00:00 hours',
    "requestDate" TEXT NOT NULL,
    "scheduledDate" TEXT,
    "maintenanceType" TEXT NOT NULL DEFAULT 'Corrective',
    "company" TEXT NOT NULL,
    "notes" TEXT,
    "instructions" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
