

using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;

namespace backend
{
    public class Configure
    {
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.Use(async (context, next) =>
            {
                await context.Response.WriteAsync("Hello World!");
                await next();
            });
        }
    }

    public class Startup
    {
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            new Configure().Configure(app, env);
        }
    }
}