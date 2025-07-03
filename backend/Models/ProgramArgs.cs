package Models;

using System;
using System.ComponentModel.DataAnnotations;

public class ProgramArgs
{
    [Required]
    public string[] Args { get; set; }

    public ProgramArgs(string[] args)
    {
        Args = args;
    }

    public ValidationResult Validate()
    {
        if (Args == null || Args.Length == 0)
        {
            return new ValidationResult("Args cannot be null or empty.");
        }
        return ValidationResult.Success;
    }
}