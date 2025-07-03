package backend.Services;

using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

public class HistoryContext : DbContext
{
    public DbSet<HistoryEntry> HistoryEntries { get; set; }
}

public class HistoryEntry
{
    public int Id { get; set; }
    public string Entry { get; set; }
}

public class HistoryService
{
    private readonly HistoryContext _context;

    public HistoryService(HistoryContext context)
    {
        _context = context;
    }

    public string ClearHistory()
    {
        var historyCount = _context.HistoryEntries.Count();
        if (historyCount == 0)
        {
            return "History is already empty.";
        }
        _context.HistoryEntries.RemoveRange(_context.HistoryEntries);
        _context.SaveChanges();
        return "History cleared successfully.";
    }
}