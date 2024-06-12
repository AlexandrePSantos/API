-- CreateTable
CREATE TABLE "usertask" (
    "idusertask" SERIAL NOT NULL,
    "iduser" INTEGER NOT NULL,
    "idtask" INTEGER NOT NULL,

    CONSTRAINT "usertask_pkey" PRIMARY KEY ("idusertask")
);

-- CreateTable
CREATE TABLE "obs" (
    "idobs" SERIAL NOT NULL,
    "idtask" INTEGER NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "obs_pkey" PRIMARY KEY ("idobs")
);
