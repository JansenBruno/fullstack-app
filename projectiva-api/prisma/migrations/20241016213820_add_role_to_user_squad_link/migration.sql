/*
  Warnings:

  - Added the required column `role` to the `UserSquadLink` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserSquadLink" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "squadId" INTEGER NOT NULL,
    "role" TEXT NOT NULL,
    CONSTRAINT "UserSquadLink_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserSquadLink_squadId_fkey" FOREIGN KEY ("squadId") REFERENCES "Squad" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_UserSquadLink" ("id", "squadId", "userId") SELECT "id", "squadId", "userId" FROM "UserSquadLink";
DROP TABLE "UserSquadLink";
ALTER TABLE "new_UserSquadLink" RENAME TO "UserSquadLink";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
