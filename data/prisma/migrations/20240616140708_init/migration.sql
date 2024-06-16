-- CreateTable
CREATE TABLE "usertype" (
    "idtype" SERIAL NOT NULL,
    "type" VARCHAR(50) NOT NULL,

    CONSTRAINT "usertype_pkey" PRIMARY KEY ("idtype")
);

-- CreateTable
CREATE TABLE "user" (
    "iduser" SERIAL NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "photo" TEXT,
    "password" VARCHAR(255) NOT NULL,
    "idtype" INTEGER NOT NULL,
    "username" VARCHAR(50),
    "name" VARCHAR(100),
    "last_login" TIMESTAMP(3),

    CONSTRAINT "user_pkey" PRIMARY KEY ("iduser")
);

-- CreateTable
CREATE TABLE "state" (
    "idstate" SERIAL NOT NULL,
    "state" VARCHAR(50) NOT NULL,

    CONSTRAINT "state_pkey" PRIMARY KEY ("idstate")
);

-- CreateTable
CREATE TABLE "project" (
    "idproject" SERIAL NOT NULL,
    "nameproject" VARCHAR(100) NOT NULL,
    "startdatep" DATE,
    "enddatep" DATE,
    "idstate" INTEGER NOT NULL,
    "iduser" INTEGER NOT NULL,
    "completionstatus" BOOLEAN NOT NULL DEFAULT false,
    "performancereview" TEXT,

    CONSTRAINT "project_pkey" PRIMARY KEY ("idproject")
);

-- CreateTable
CREATE TABLE "task" (
    "idtask" SERIAL NOT NULL,
    "nametask" VARCHAR(100) NOT NULL,
    "startdatet" DATE,
    "enddatet" DATE,
    "idproject" INTEGER NOT NULL,
    "idstate" INTEGER NOT NULL,
    "timespend" INTEGER,
    "local" VARCHAR(100),
    "completionrate" DECIMAL(5,2),

    CONSTRAINT "task_pkey" PRIMARY KEY ("idtask")
);

-- CreateTable
CREATE TABLE "synclog" (
    "idlog" SERIAL NOT NULL,
    "iduser" INTEGER NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "action" VARCHAR(100) NOT NULL,
    "status" VARCHAR(50) NOT NULL,

    CONSTRAINT "synclog_pkey" PRIMARY KEY ("idlog")
);

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

-- CreateTable
CREATE TABLE "performance" (
    "idperformance" SERIAL NOT NULL,
    "iduser" INTEGER NOT NULL,
    "idtask" INTEGER NOT NULL,
    "stars" INTEGER NOT NULL,
    "review" TEXT NOT NULL,

    CONSTRAINT "performance_pkey" PRIMARY KEY ("idperformance")
);
