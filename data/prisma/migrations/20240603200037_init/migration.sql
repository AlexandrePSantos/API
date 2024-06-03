-- Criação da tabela UserType
CREATE TABLE UserType (
    idType SERIAL PRIMARY KEY,
    type VARCHAR(50) NOT NULL
);

-- Criação da tabela User
CREATE TABLE "User" (
    idUser SERIAL PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    photo TEXT,
    password VARCHAR(255) NOT NULL,
    idType INT,
    username VARCHAR(50) UNIQUE,
    name VARCHAR(100),
    last_login TIMESTAMP,
    FOREIGN KEY (idType) REFERENCES UserType(idType)
);

-- Criação da tabela State
CREATE TABLE State (
    idState SERIAL PRIMARY KEY,
    state VARCHAR(50) NOT NULL
);

-- Criação da tabela Project
CREATE TABLE Project (
    idProject SERIAL PRIMARY KEY,
    nameProject VARCHAR(100) NOT NULL,
    startDateP DATE,
    endDateP DATE,
    idState INT,
    idUser INT,
    completionStatus BOOLEAN DEFAULT FALSE,
    performanceReview TEXT,
    obs TEXT,
    FOREIGN KEY (idState) REFERENCES State(idState),
    FOREIGN KEY (idUser) REFERENCES "User"(idUser)
);

-- Criação da tabela Task
CREATE TABLE Task (
    idTask SERIAL PRIMARY KEY,
    nameTask VARCHAR(100) NOT NULL,
    startDateT DATE,
    endDateT DATE,
    idProject INT,
    idState INT,
    photo TEXT,
    timeSpend TIME,
    local VARCHAR(100),
    taxes DECIMAL(10, 2),
    completionRate DECIMAL(5, 2),
    photos TEXT,
    observations TEXT,
    FOREIGN KEY (idProject) REFERENCES Project(idProject),
    FOREIGN KEY (idState) REFERENCES State(idState)
);

-- Criação da tabela SyncLog
CREATE TABLE SyncLog (
    idLog SERIAL PRIMARY KEY,
    idUser INT,
    "timestamp" TIMESTAMP,
    action VARCHAR(100),
    status VARCHAR(50),
    FOREIGN KEY (idUser) REFERENCES "User"(idUser)
);