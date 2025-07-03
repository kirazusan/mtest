package Calculator.Services;

using System;
using System.Collections.Generic;

public class CalculationHistory
{
    public string Operation { get; set; }
    public double Result { get; set; }
    public DateTime Timestamp { get; set; }

    public CalculationHistory(string operation, double result)
    {
        Operation = operation;
        Result = result;
        Timestamp = DateTime.Now;
    }
}

public class CalculationHistoryService
{
    private List<CalculationHistory> _history;

    public CalculationHistoryService()
    {
        _history = new List<CalculationHistory>();
    }

    public void AddToHistory(CalculationHistory history)
    {
        if (history == null)
        {
            throw new ArgumentNullException(nameof(history), "History entry cannot be null.");
        }
        _history.Add(history);
    }

    public List<CalculationHistory> GetHistory()
    {
        return new List<CalculationHistory>(_history);
    }
}