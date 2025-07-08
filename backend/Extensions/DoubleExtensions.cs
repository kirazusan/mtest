package backend.Extensions;

using System;

public static class DoubleExtensions
{
    public static string ToTrimmedString(this double value, string format)
    {
        if (string.IsNullOrEmpty(format))
        {
            format = "G"; // Default format
        }
        
        string result = value.ToString(format);
        result = result.TrimEnd('0');
        if (result.EndsWith("."))
        {
            result = result.TrimEnd('.');
        }
        return result;
    }
}

using System;
using Xunit;

public class DoubleExtensionsTests
{
    [Theory]
    [InlineData(123.4500, "F2", "123.45")]
    [InlineData(123.0000, "F2", "123")]
    [InlineData(123.4567, "F4", "123.4567")]
    [InlineData(123.0001, "F4", "123.0001")]
    [InlineData(123.0000, null, "123")]
    [InlineData(123.0000, "", "123")]
    [InlineData(123.0, "F1", "123")]
    [InlineData(123.0, "G", "123")]
    [InlineData(0.0000, "F2", "0")]
    [InlineData(0.0001, "F4", "0.0001")]
    [InlineData(0.0, null, "0")]
    [InlineData(0.0, "", "0")]
    public void ToTrimmedString_ShouldReturnExpectedResult(double value, string format, string expected)
    {
        string result = value.ToTrimmedString(format);
        Assert.Equal(expected, result);
    }
}