package backend.Models;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.text.DecimalFormat;
import java.text.NumberFormat;

public class NumberFormatRequest {
    @NotNull
    private Double value;

    @NotNull
    @Pattern(regexp = "^[#0.,]*$")
    private String formatPattern;

    public NumberFormatRequest(Double value, String formatPattern) {
        this.value = value;
        this.formatPattern = formatPattern;
    }

    public Double getValue() {
        return value;
    }

    public void setValue(Double value) {
        this.value = value;
    }

    public String getFormatPattern() {
        return formatPattern;
    }

    public void setFormatPattern(String formatPattern) {
        this.formatPattern = formatPattern;
    }

    public String formatNumber() {
        NumberFormat formatter = new DecimalFormat(formatPattern);
        return formatter.format(value);
    }
}