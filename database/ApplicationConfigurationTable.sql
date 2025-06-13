

```sql
CREATE TABLE ApplicationConfiguration (
    Id INT PRIMARY KEY,
    Color VARCHAR(255) NOT NULL,
    Font VARCHAR(255) NOT NULL,
    FontSize INT NOT NULL
);

INSERT INTO ApplicationConfiguration (Id, Color, Font, FontSize)
VALUES
(1, '#000000', 'Arial', 12),
(2, '#FFFFFF', 'Times New Roman', 14),
(3, '#808080', 'Calibri', 10);

CREATE PROCEDURE GetApplicationConfiguration
AS
BEGIN
    SELECT * FROM ApplicationConfiguration;
END;

CREATE PROCEDURE GetApplicationConfigurationById
@Id INT
AS
BEGIN
    SELECT * FROM ApplicationConfiguration WHERE Id = @Id;
END;

CREATE PROCEDURE UpdateApplicationConfiguration
@Id INT,
@Color VARCHAR(255),
@Font VARCHAR(255),
@FontSize INT
AS
BEGIN
    UPDATE ApplicationConfiguration
    SET Color = @Color, Font = @Font, FontSize = @FontSize
    WHERE Id = @Id;
END;

CREATE PROCEDURE DeleteApplicationConfiguration
@Id INT
AS
BEGIN
    DELETE FROM ApplicationConfiguration WHERE Id = @Id;
END;
```