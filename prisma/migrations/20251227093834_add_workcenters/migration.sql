-- CreateTable
CREATE TABLE "WorkCenter" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "tag" TEXT,
    "alternativeWorkcenters" TEXT,
    "costPerHour" REAL NOT NULL DEFAULT 0,
    "capacityTimeEfficiency" REAL NOT NULL DEFAULT 100,
    "oeeTarget" REAL NOT NULL DEFAULT 85,
    "company" TEXT NOT NULL DEFAULT 'TechCorp Industries',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "WorkCenter_code_key" ON "WorkCenter"("code");
