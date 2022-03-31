-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_artistsSongs" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "artistId" INTEGER NOT NULL,
    "songId" INTEGER NOT NULL,
    CONSTRAINT "artistsSongs_songId_fkey" FOREIGN KEY ("songId") REFERENCES "Song" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "artistsSongs_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_artistsSongs" ("artistId", "id", "songId") SELECT "artistId", "id", "songId" FROM "artistsSongs";
DROP TABLE "artistsSongs";
ALTER TABLE "new_artistsSongs" RENAME TO "artistsSongs";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
