

using Foundation;
using UIKit;

namespace MyApp
{
    public class Program
    {
        public static void Main(string[] args)
        {
            try
            {
                UIApplication.Main(args, null, typeof(AppDelegate));
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }
    }
}