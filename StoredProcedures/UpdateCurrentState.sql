

```sql
CREATE PROCEDURE [dbo].[UpdateCurrentState]
    @NewState nvarchar(50),
    @RecordId int
AS
BEGIN
    SET NOCOUNT ON;

    IF @NewState IS NULL OR @RecordId IS NULL
    BEGIN
        RAISERROR('Invalid input parameters', 16, 1);
        RETURN;
    END

    BEGIN TRY
        BEGIN TRANSACTION;

        UPDATE [dbo].[CurrentStateTable]
        SET State = @NewState
        WHERE RecordId = @RecordId;

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        DECLARE @ErrorMessage nvarchar(4000);
        SET @ErrorMessage = ERROR_MESSAGE();
        RAISERROR (@ErrorMessage, 16, 1);
    END CATCH
END
```