-- CreateTable
CREATE TABLE "Piscine" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "parent" TEXT NOT NULL DEFAULT 'FREE'
);

-- CreateTable
CREATE TABLE "Roller" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "student" TEXT NOT NULL,
    "size" INTEGER NOT NULL DEFAULT 0,
    "hasRoller" BOOLEAN NOT NULL DEFAULT false,
    "hasHelmet" BOOLEAN NOT NULL DEFAULT false,
    "hasProtect" BOOLEAN NOT NULL DEFAULT false,
    "hasAnswered" BOOLEAN NOT NULL DEFAULT false
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Sondage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "buttonText" TEXT NOT NULL,
    "info" TEXT NOT NULL DEFAULT ' '
);
INSERT INTO "new_Sondage" ("active", "buttonText", "id", "info", "name") SELECT "active", "buttonText", "id", "info", "name" FROM "Sondage";
DROP TABLE "Sondage";
ALTER TABLE "new_Sondage" RENAME TO "Sondage";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
