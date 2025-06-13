

```sql
CREATE TABLE PermissionRequests (
    Id INT PRIMARY KEY IDENTITY(1,1),
    RequestDate DATE NOT NULL DEFAULT GETDATE(),
    RequestedBy VARCHAR(255) NOT NULL CHECK (LEN(RequestedBy) > 0),
    PermissionType VARCHAR(255) NOT NULL CHECK (LEN(PermissionType) > 0),
    Status VARCHAR(255) NOT NULL CHECK (LEN(Status) > 0)
);

CREATE TABLE NotificationChannelSettings (
    Id INT PRIMARY KEY IDENTITY(1,1),
    ChannelType VARCHAR(255) NOT NULL CHECK (LEN(ChannelType) > 0),
    ChannelUrl VARCHAR(255) NOT NULL CHECK (LEN(ChannelUrl) > 0),
    IsActive BIT NOT NULL DEFAULT 0
);

CREATE PROCEDURE GetStartupConfigurationFromDatabase
    @Id INT = NULL
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;

        IF @Id IS NOT NULL
        BEGIN
            SELECT * FROM PermissionRequests WHERE Id = @Id;
            SELECT * FROM NotificationChannelSettings WHERE Id = @Id;
        END
        ELSE
        BEGIN
            SELECT * FROM PermissionRequests;
            SELECT * FROM NotificationChannelSettings;
        END

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        DECLARE @ErrorMessage NVARCHAR(4000);
        SET @ErrorMessage = ERROR_MESSAGE();
        RAISERROR (@ErrorMessage, 16, 1);
    END CATCH
END;
```