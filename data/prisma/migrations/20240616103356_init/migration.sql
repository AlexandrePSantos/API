-- CreateTable
CREATE TABLE "performance" (
    "idperformance" SERIAL NOT NULL,
    "iduser" INTEGER NOT NULL,
    "idtask" INTEGER NOT NULL,
    "stars" INTEGER NOT NULL,
    "review" TEXT NOT NULL,

    CONSTRAINT "performance_pkey" PRIMARY KEY ("idperformance")
);
