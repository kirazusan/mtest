package Models;

public class HistoryResponse {
    public string Message { get; set; }
    public bool Success { get; set; }
    public DateTime Timestamp { get; set; }

    public HistoryResponse(string message, bool success) {
        Message = message;
        Success = success;
        Timestamp = DateTime.Now;
    }
}