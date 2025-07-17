using System;

namespace Calculator
{
    public class Calculator
    {
        public static double Calculate(double value1, double value2, string mathOperator)
        {
            double result = 0;
            switch (mathOperator)
            {
                case "÷":
                    if (value2 != 0)
                    {
                        result = value1 / value2;
                    }
                    else
                    {
                        throw new DivideByZeroException("Division by zero is not allowed.");
                    }
                    break;
                case "×":
                    result = value1 * value2;
                    break;
                case "+":
                    result = value1 + value2;
                    break;
                case "-":
                    result = value1 - value2;
                    break;
                default:
                    result = 0;
                    break;
            }
            return result;
        }
    }
}