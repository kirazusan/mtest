

package frontend.services;

import java.util.concurrent.CompletableFuture;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class Middleware {
    public CompletableFuture<Void> handleRequest(HttpContext context) {
        HttpServletRequest request = context.getRequest();
        HttpServletResponse response = context.getResponse();
        return CompletableFuture.runAsync(() -> {
            try {
                response.getWriter().write("Hello World!");
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        });
    }
}