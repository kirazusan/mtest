using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using YourNamespace.Controllers;
using YourNamespace.Services;

public class Startup
{
    public void ConfigureServices(IServiceCollection services)
    {
        services.AddControllers();
        services.AddScoped<MauiAppService>();
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
        }

        app.UseRouting();
        app.UseCors(builder => builder.WithOrigins("http://localhost:3000").AllowAnyMethod().AllowAnyHeader());

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();
            endpoints.MapPost("/api/mauiapp/create", async context =>
            {
                var controller = new MauiAppController(new MauiAppService());
                await controller.Create(context);
            });
        });
    }
}