using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;

public class Startup
{
    public void ConfigureServices(IServiceCollection services)
    {
        services.AddControllers();
        services.AddScoped<AppService>();
        services.AddScoped<CalculatorService>();
        services.AddScoped<ApplicationController>();
        services.AddScoped<CalculatorController>();
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
        }

        app.UseRouting();

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();
            endpoints.MapGet("/api/app/config", async context =>
            {
                var controller = context.RequestServices.GetService<ApplicationController>();
                await controller.GetConfigAsync(context);
            });
        });
    }
}