-- Criação da tabela UserType
CREATE TABLE UserType (
    idType INT PRIMARY KEY AUTO_INCREMENT,
    type VARCHAR(50) NOT NULL
);

-- Criação da tabela User
CREATE TABLE User (
    idUser INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(100) NOT NULL UNIQUE,
    photo TEXT,
    password VARCHAR(255) NOT NULL,
    idType INT,
    username VARCHAR(50) UNIQUE,
    name VARCHAR(100),
    last_login DATETIME,
    FOREIGN KEY (idType) REFERENCES UserType(idType)
);

-- Criação da tabela State
CREATE TABLE State (
    idState INT PRIMARY KEY AUTO_INCREMENT,
    state VARCHAR(50) NOT NULL
);

-- Criação da tabela Project
CREATE TABLE Project (
    idProject INT PRIMARY KEY AUTO_INCREMENT,
    nameProject VARCHAR(100) NOT NULL,
    startDateP DATE,
    endDateP DATE,
    idState INT,
    idUser INT,
    completionStatus BOOLEAN DEFAULT FALSE,
    performanceReview TEXT,
    obs TEXT,
    FOREIGN KEY (idState) REFERENCES State(idState),
    FOREIGN KEY (idUser) REFERENCES User(idUser)
);

-- Criação da tabela Task
CREATE TABLE Task (
    idTask INT PRIMARY KEY AUTO_INCREMENT,
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

-- Criação da tabela Permission
CREATE TABLE Permission (
    idPermission INT PRIMARY KEY AUTO_INCREMENT,
    role VARCHAR(50) NOT NULL,
    can_create_project BOOLEAN,
    can_edit_project BOOLEAN,
    can_delete_project BOOLEAN,
    can_manage_users BOOLEAN,
    can_assign_tasks BOOLEAN,
    can_export_stats BOOLEAN,
    idType INT,
    FOREIGN KEY (idType) REFERENCES UserType(idType)
);

-- Criação da tabela SyncLog
CREATE TABLE SyncLog (
    idLog INT PRIMARY KEY AUTO_INCREMENT,
    idUser INT,
    timestamp DATETIME,
    action VARCHAR(100),
    status VARCHAR(50),
    FOREIGN KEY (idUser) REFERENCES User(idUser)
);

-- Criação da tabela LocalBackup
CREATE TABLE LocalBackup (
    idBackup INT PRIMARY KEY AUTO_INCREMENT,
    data BLOB,
    timestamp DATETIME,
    idUser INT,
    FOREIGN KEY (idUser) REFERENCES User(idUser)
);

-- Criação da tabela AuthToken
CREATE TABLE AuthToken (
    idToken INT PRIMARY KEY AUTO_INCREMENT,
    idUser INT,
    token VARCHAR(255) NOT NULL,
    expires DATETIME,
    FOREIGN KEY (idUser) REFERENCES User(idUser)
);

-- Criação de índices para melhorar o desempenho
CREATE INDEX idx_user_email ON User(email);
CREATE INDEX idx_project_user ON Project(idUser);
CREATE INDEX idx_task_project ON Task(idProject);
