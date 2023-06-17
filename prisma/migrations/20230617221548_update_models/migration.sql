-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Result" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "exerciseId" INTEGER NOT NULL,
    "workoutId" INTEGER NOT NULL,
    "sets" INTEGER NOT NULL,
    "reps" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,
    CONSTRAINT "Result_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Result_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Result" ("exerciseId", "id", "reps", "sets", "weight", "workoutId") SELECT "exerciseId", "id", "reps", "sets", "weight", "workoutId" FROM "Result";
DROP TABLE "Result";
ALTER TABLE "new_Result" RENAME TO "Result";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
