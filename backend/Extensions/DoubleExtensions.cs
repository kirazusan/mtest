package backend.Extensions;

using System;

public static class DoubleExtensions
{
    public static string ToTrimmedString(double value, string format)
    {
        try
        {
            string result = value.ToString(format);
            if (result.Contains("."))
            {
                result = result.TrimEnd('0');
                if (result.EndsWith("."))
                {
                    result = result.TrimEnd('.');
                }
            }
            return result;
        }
        catch (FormatException)
        {
            throw new ArgumentException("Invalid format string.", nameof(format));
        }
        catch (Exception ex)
        {
            throw new ArgumentException("An error occurred while converting the double to string.", ex);
        }
    }
}

using NUnit.Framework;

[TestFixture]
public class DoubleExtensionsTests
{
    [Test]
    public void ToTrimmedString_ValidInput_ReturnsTrimmedString()
    {
        Assert.AreEqual("123.45", DoubleExtensions.ToTrimmedString(123.4500, "0.##"));
        Assert.AreEqual("123", DoubleExtensions.ToTrimmedString(123.0000, "0.##"));
        Assert.AreEqual("123.4", DoubleExtensions.ToTrimmedString(123.4000, "0.##"));
        Assert.AreEqual("123.456", DoubleExtensions.ToTrimmedString(123.456, "0.###"));
    }

    [Test]
    public void ToTrimmedString_InvalidFormat_ThrowsArgumentException()
    {
        Assert.Throws<ArgumentException>(() => DoubleExtensions.ToTrimmedString(123.45, "invalid_format"));
    }

    [Test]
    public void ToTrimmedString_HandlesDecimalPoint_ReturnsTrimmedString()
    {
        Assert.AreEqual("123.", DoubleExtensions.ToTrimmedString(123.0000, "0."));
    }

    [Test]
    public void ToTrimmedString_HandlesNegativeValues_ReturnsTrimmedString()
    {
        Assert.AreEqual("-123.45", DoubleExtensions.ToTrimmedString(-123.4500, "0.##"));
    }
}