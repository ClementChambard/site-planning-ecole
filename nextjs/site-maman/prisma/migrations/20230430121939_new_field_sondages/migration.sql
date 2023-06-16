/*
  Warnings:

  - Added the required column `buttonText` to the `Sondage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `info` to the `Sondage` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Sondage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "buttonText" TEXT NOT NULL,
    "info" TEXT NOT NULL
);
INSERT INTO "new_Sondage" ("active", "id", "name") SELECT "active", "id", "name" FROM "Sondage";
DROP TABLE "Sondage";
ALTER TABLE "new_Sondage" RENAME TO "Sondage";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
