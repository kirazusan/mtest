

CREATE TABLE NotificationChannels (
    Id INT PRIMARY KEY NOT NULL,
    Name VARCHAR(255) NOT NULL,
    Description VARCHAR(500) NOT NULL,
    UNIQUE (Name),
    INDEX idx_Name (Name)
);