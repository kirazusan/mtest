package backend.Models;

public class DoubleTrimmedResponse {
    private String trimmedValue;

    public DoubleTrimmedResponse(String trimmedValue) {
        if (trimmedValue == null) {
            throw new IllegalArgumentException("trimmedValue cannot be null");
        }
        this.trimmedValue = trimmedValue.trim();
    }

    public String getTrimmedValue() {
        return trimmedValue;
    }
}