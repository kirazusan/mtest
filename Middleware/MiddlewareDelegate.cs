

namespace Middleware
{
    using Microsoft.AspNetCore.Http;

    public class MiddlewareDelegate
    {
        public Task Invoke(HttpContext context)
        {
            return context.Response.WriteAsync("Hello World!");
        }
    }
}