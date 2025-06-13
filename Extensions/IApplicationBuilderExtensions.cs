

namespace Extensions
{
    using Microsoft.AspNetCore.Builder;

    public static class IApplicationBuilderExtensions
    {
        public static IApplicationBuilder RunMiddleware(this IApplicationBuilder app, Func<HttpContext, Func<Task>, Task> middleware)
        {
            return app.Run(async context =>
            {
                await middleware(context, () => Task.CompletedTask);
            });
        }
    }
}