

```csharp
using System;

namespace Models
{
    public class CalculatorModel
    {
        private double _firstNumber;
        private double _secondNumber;
        private string _currentState;
        private string _decimalFormat;
        private string _currentEntry;

        public double FirstNumber
        {
            get { return _firstNumber; }
            set { _firstNumber = value; }
        }

        public double SecondNumber
        {
            get { return _secondNumber; }
            set { _secondNumber = value; }
        }

        public string CurrentState
        {
            get { return _currentState; }
            set { _currentState = value; }
        }

        public string DecimalFormat
        {
            get { return _decimalFormat; }
            set { _decimalFormat = value; }
        }

        public string CurrentEntry
        {
            get { return _currentEntry; }
            set { _currentEntry = value; }
        }

        public double Calculate()
        {
            double result = 0;
            switch (_currentState)
            {
                case "Addition":
                    result = _firstNumber + _secondNumber;
                    break;
                case "Subtraction":
                    result = _firstNumber - _secondNumber;
                    break;
                case "Multiplication":
                    result = _firstNumber * _secondNumber;
                    break;
                case "Division":
                    if (_secondNumber != 0)
                    {
                        result = _firstNumber / _secondNumber;
                    }
                    else
                    {
                        throw new DivideByZeroException("Cannot divide by zero");
                    }
                    break;
                default:
                    throw new ArgumentException("Invalid operation");
            }
            return result;
        }
    }
}
```