

using System;

namespace backend
{
    public class Program
    {
        public static void Main(string[] args)
        {
            if (args == null || args.Length == 0)
            {
                throw new ArgumentException("args cannot be null or empty", nameof(args));
            }

            try
            {
                backend.Startup.Main(args);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred: {ex.Message}");
                throw;
            }
        }
    }
}