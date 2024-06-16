-- Criação da tabela usertype
CREATE TABLE usertype (
    idtype SERIAL PRIMARY KEY,
    type VARCHAR(50) NOT NULL
);

-- Criação da tabela "User"
CREATE TABLE "user" (
    iduser SERIAL PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    photo TEXT,
    password VARCHAR(255) NOT NULL,
    idtype INT,
    username VARCHAR(50) UNIQUE,
    name VARCHAR(100),
    last_login TIMESTAMP,
    FOREIGN KEY (idtype) REFERENCES usertype(idtype)
);

-- Criação da tabela state
CREATE TABLE state (
    idstate SERIAL PRIMARY KEY,
    state VARCHAR(50) NOT NULL
);

-- Criação da tabela project
CREATE TABLE project (
    idproject SERIAL PRIMARY KEY,
    nameproject VARCHAR(100) NOT NULL,
    startdatep DATE,
    enddatep DATE,
    idstate INT,
    iduser INT,
    performancereview TEXT,
    obs TEXT,
    FOREIGN KEY (idstate) REFERENCES state(idstate),
    FOREIGN KEY (iduser) REFERENCES "user"(iduser)
);

-- Criação da tabela task
CREATE TABLE task (
    idtask SERIAL PRIMARY KEY,
    nametask VARCHAR(100) NOT NULL,
    startdatet DATE,
    enddatet DATE,
    idproject INT,
    idstate INT,
    photo TEXT,
    timespend TIME,
    local VARCHAR(100),
    taxes DECIMAL(10, 2),
    completionrate DECIMAL(5, 2),
    photos TEXT,
    observations TEXT,
    FOREIGN KEY (idproject) REFERENCES project(idproject),
    FOREIGN KEY (idstate) REFERENCES state(idstate)
);

-- Criação da tabela SyncLog
CREATE TABLE synclog (
    idlog SERIAL PRIMARY KEY,
    iduser INT,
    "timestamp" TIMESTAMP,
    action VARCHAR(100),
    status VARCHAR(50),
    FOREIGN KEY (iduser) REFERENCES "user"(iduser)
);