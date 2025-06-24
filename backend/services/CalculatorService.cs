

using System;

namespace backend.services
{
    public class CalculatorService
    {
        private readonly ILogger _logger;

        public CalculatorService(ILogger logger)
        {
            _logger = logger;
        }

        public double Calculate(double firstNumber, double secondNumber, string mathOperator)
        {
            if (double.IsNaN(firstNumber) || double.IsNaN(secondNumber))
            {
                _logger.LogError("Invalid input numbers");
                throw new ArgumentException("Invalid input numbers");
            }

            if (string.IsNullOrWhiteSpace(mathOperator))
            {
                _logger.LogError("Invalid math operator");
                throw new ArgumentException("Invalid math operator");
            }

            try
            {
                return PerformCalculation(firstNumber, secondNumber, mathOperator);
            }
            catch (DivideByZeroException ex)
            {
                _logger.LogError(ex, "Cannot divide by zero");
                throw;
            }
            catch (OverflowException ex)
            {
                _logger.LogError(ex, "Overflow occurred during calculation");
                throw;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred during calculation");
                throw;
            }
        }

        private double PerformCalculation(double firstNumber, double secondNumber, string mathOperator)
        {
            switch (mathOperator)
            {
                case "+":
                    return Add(firstNumber, secondNumber);
                case "-":
                    return Subtract(firstNumber, secondNumber);
                case "*":
                    return Multiply(firstNumber, secondNumber);
                case "/":
                    return Divide(firstNumber, secondNumber);
                default:
                    _logger.LogError("Invalid math operator");
                    throw new ArgumentException("Invalid math operator");
            }
        }

        private double Add(double firstNumber, double secondNumber)
        {
            try
            {
                return checked(firstNumber + secondNumber);
            }
            catch (OverflowException ex)
            {
                _logger.LogError(ex, "Overflow occurred during addition");
                throw;
            }
        }

        private double Subtract(double firstNumber, double secondNumber)
        {
            try
            {
                return checked(firstNumber - secondNumber);
            }
            catch (OverflowException ex)
            {
                _logger.LogError(ex, "Overflow occurred during subtraction");
                throw;
            }
        }

        private double Multiply(double firstNumber, double secondNumber)
        {
            try
            {
                return checked(firstNumber * secondNumber);
            }
            catch (OverflowException ex)
            {
                _logger.LogError(ex, "Overflow occurred during multiplication");
                throw;
            }
        }

        private double Divide(double firstNumber, double secondNumber)
        {
            if (secondNumber == 0)
            {
                _logger.LogError("Cannot divide by zero");
                throw new DivideByZeroException("Cannot divide by zero");
            }

            try
            {
                return checked(firstNumber / secondNumber);
            }
            catch (OverflowException ex)
            {
                _logger.LogError(ex, "Overflow occurred during division");
                throw;
            }
        }
    }
}