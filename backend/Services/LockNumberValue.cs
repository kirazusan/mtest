

```csharp
using System;
using System.Data;
using Microsoft.Extensions.Logging;
using System.Data.SqlClient;

namespace backend.Services
{
    public class LockNumberValue
    {
        private readonly ILogger<LockNumberValue> _logger;
        private readonly IDbConnection _connection;

        public LockNumberValue(ILogger<LockNumberValue> logger, IDbConnection connection)
        {
            _logger = logger;
            _connection = connection;
        }

        public void Lock(int numberValue)
        {
            if (numberValue <= 0)
            {
                _logger.LogError("Invalid number value: {NumberValue}", numberValue);
                throw new ArgumentException("Number value must be greater than zero", nameof(numberValue));
            }

            try
            {
                _connection.Open();

                using (IDbCommand command = _connection.CreateCommand())
                {
                    command.CommandText = "UPDATE Numbers SET IsLocked = 1 WHERE NumberValue = @NumberValue";
                    command.Parameters.Add(new SqlParameter("@NumberValue", numberValue));

                    int rowsAffected = command.ExecuteNonQuery();

                    if (rowsAffected == 0)
                    {
                        _logger.LogWarning("No rows were updated for number value: {NumberValue}", numberValue);
                    }
                }
            }
            catch (SqlException ex)
            {
                _logger.LogError(ex, "Error locking number value: {NumberValue}", numberValue);
                throw;
            }
            finally
            {
                _connection.Close();
            }
        }
    }
}
```