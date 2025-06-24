

using System;

namespace Models
{
    public class CalculatorModel
    {
        public string CurrentEntry { get; set; }
        public string ResultText { get; set; }
        public string CurrentState { get; set; }
        public string DecimalFormat { get; set; }

        public CalculatorModel()
        {
            DecimalFormat = "N2";
        }
    }
}