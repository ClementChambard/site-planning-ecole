/*
  Warnings:

  - You are about to drop the column `when` on the `Rdv` table. All the data in the column will be lost.
  - Added the required column `hour` to the `Rdv` table without a default value. This is not possible if the table is not empty.
  - Added the required column `minute` to the `Rdv` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Rdv" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "hour" INTEGER NOT NULL,
    "minute" INTEGER NOT NULL,
    "student" TEXT NOT NULL
);
INSERT INTO "new_Rdv" ("id", "student") SELECT "id", "student" FROM "Rdv";
DROP TABLE "Rdv";
ALTER TABLE "new_Rdv" RENAME TO "Rdv";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
