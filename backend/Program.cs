

using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;

namespace backend
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var webHostBuilder = new WebHostBuilder();
            webHostBuilder.UseKestrel();
            webHostBuilder.UseContentRoot(Directory.GetCurrentDirectory());
            webHostBuilder.UseIISIntegration();
            webHostBuilder.UseStartup<Startup>();
            webHostBuilder.Build().Run();
        }
    }
}