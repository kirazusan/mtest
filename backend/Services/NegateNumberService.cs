using System;

namespace backend.Services
{
    public class NegateNumberService
    {
        public double Negate(double number)
        {
            if (double.IsInfinity(number) || double.IsNaN(number))
            {
                throw new ArgumentOutOfRangeException("Input must be a finite number. Received: " + number);
            }
            return -number;
        }
    }
}