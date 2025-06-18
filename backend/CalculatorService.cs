

using System;
using System.Data.SQLite;

namespace backend
{
    public class CalculatorService
    {
        private readonly ICalculatorRepository _repository;
        private readonly ICalculator _calculator;

        public CalculatorService(ICalculatorRepository repository, ICalculator calculator)
        {
            _repository = repository;
            _calculator = calculator;
        }

        public string Calculate(string expression)
        {
            try
            {
                double result = _calculator.Evaluate(expression);
                _repository.SaveHistory(expression, result.ToString());
                return result.ToString();
            }
            catch (Exception ex)
            {
                return "Error: " + ex.Message;
            }
        }
    }

    public interface ICalculatorRepository
    {
        void SaveHistory(string expression, string result);
    }

    public class CalculatorRepository : ICalculatorRepository
    {
        private readonly SQLiteConnection _connection;

        public CalculatorRepository(SQLiteConnection connection)
        {
            _connection = connection;
        }

        public void SaveHistory(string expression, string result)
        {
            string insertQuery = "INSERT INTO calculator_history (expression, result) VALUES (@expression, @result)";
            using (SQLiteCommand command = new SQLiteCommand(insertQuery, _connection))
            {
                command.Parameters.AddWithValue("@expression", expression);
                command.Parameters.AddWithValue("@result", result);
                command.ExecuteNonQuery();
            }
        }
    }

    public interface ICalculator
    {
        double Evaluate(string expression);
    }

    public class Calculator : ICalculator
    {
        public double Evaluate(string expression)
        {
            return Convert.ToDouble(new DataTable().Compute(expression, String.Empty));
        }
    }

    public class CalculatorServiceFactory
    {
        public static CalculatorService CreateCalculatorService()
        {
            SQLiteConnection connection = new SQLiteConnection("Data Source=calculator.db");
            connection.Open();

            string createTableQuery = "CREATE TABLE IF NOT EXISTS NOT EXISTS calculator_history (id INTEGER PRIMARY KEY AUTOINCREMENT, expression TEXT, result TEXT)";
            using (SQLiteCommand command = new SQLiteCommand(createTableQuery, connection))
            {
                command.ExecuteNonQuery();
            }

            ICalculatorRepository repository = new CalculatorRepository(connection);
            ICalculator calculator = new Calculator();

            return new CalculatorService(repository, calculator);
        }
    }
}