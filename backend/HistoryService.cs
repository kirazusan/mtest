package backend;

using System.Collections.Generic;

public class HistoryService
{
    private List<string> history;

    public HistoryService()
    {
        history = new List<string>();
    }

    public bool ClearHistory()
    {
        if (history.Count > 0)
        {
            history.Clear();
            return true;
        }
        return false;
    }

    public void AddToHistory(string entry)
    {
        history.Add(entry);
    }

    public List<string> GetHistory()
    {
        return new List<string>(history);
    }
}