package backend;

import Microsoft.AspNetCore.Builder;
import Microsoft.AspNetCore.Hosting;
import Microsoft.Extensions.DependencyInjection;
import Microsoft.Extensions.Hosting;

public class Startup {
    public void ConfigureServices(IServiceCollection services) {
        services.AddControllers();
        services.AddScoped<CalculatorService>();
        services.AddCors(options => {
            options.AddPolicy("AllowAll", builder => {
                builder.AllowAnyOrigin()
                       .AllowAnyMethod()
                       .AllowAnyHeader();
            });
        });
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env) {
        if (env.IsDevelopment()) {
            app.UseDeveloperExceptionPage();
        } else {
            app.UseExceptionHandler("/Home/Error");
        }

        app.UseRouting();
        app.UseCors("AllowAll");

        app.UseEndpoints(endpoints => {
            endpoints.MapControllers();
            endpoints.MapGet("/api/application", async context => {
                await context.Response.WriteAsync("API Application Endpoint");
            });
            endpoints.MapControllers(); // Ensures CalculatorController is accessible
        });
    }
}