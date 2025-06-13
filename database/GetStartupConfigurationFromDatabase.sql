

```sql
CREATE PROCEDURE GetStartupConfigurationFromDatabase
    @DatabaseName nvarchar(128) = NULL,
    @SchemaName nvarchar(128) = NULL,
    @ProcedureName nvarchar(128) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    IF NOT EXISTS (SELECT 1 FROM sys.databases WHERE name = @DatabaseName)
    BEGIN
        RAISERROR ('Database does not exist.', 16, 1);
        RETURN;
    END

    IF NOT EXISTS (SELECT 1 FROM sys.schemas WHERE name = @SchemaName AND database_id = DB_ID(@DatabaseName))
    BEGIN
        RAISERROR ('Schema does not exist.', 16, 1);
        RETURN;
    END

    IF NOT EXISTS (SELECT 1 FROM sys.procedures WHERE name = @ProcedureName AND schema_id = SCHEMA_ID(@SchemaName) AND database_id = DB_ID(@DatabaseName))
    BEGIN
        RAISERROR ('Procedure does not exist.', 16, 1);
        RETURN;
    END

    BEGIN TRY
        BEGIN TRANSACTION;

        EXECUTE AS USER = 'GetStartupConfigurationUser';

        SELECT 
            p.RequestId,
            p.PermissionName,
            p.RequestStatus,
            n.NotificationChannelId,
            n.ChannelName,
            n.IsEnabled
        INTO #StartupConfiguration
        FROM 
            PermissionRequests p
        INNER JOIN 
            NotificationChannels n ON p.NotificationChannelId = n.NotificationChannelId;

        COMMIT TRANSACTION;

        SELECT * FROM #StartupConfiguration;

        DROP TABLE #StartupConfiguration;

        REVERT;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END

        DECLARE @ErrorMessage nvarchar(4000);
        DECLARE @ErrorSeverity int;
        DECLARE @ErrorState int;

        SELECT 
            @ErrorMessage = ERROR_MESSAGE(),
            @ErrorSeverity = ERROR_SEVERITY(),
            @ErrorState = ERROR_STATE();

        RAISERROR (@ErrorMessage, @ErrorSeverity, @ErrorState);
    END CATCH
END
GO

GRANT EXECUTE ON PROCEDURE GetStartupConfigurationFromDatabase TO GetStartupConfigurationUser;
GO
```