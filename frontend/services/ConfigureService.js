

import frontend.components.ConfigureComponent;

public class ConfigureService {
    private ConfigureComponent component;

    public ConfigureService() {
        this.component = new ConfigureComponent();
    }

    public void configurePipeline() {
        // Configure the request pipeline to handle incoming requests in a specific order
        // For example, using a filter chain
        FilterChain filterChain = new FilterChain();
        filterChain.addFilter(new AuthenticationFilter());
        filterChain.addFilter(new AuthorizationFilter());
        filterChain.addFilter(new LoggingFilter());

        // Execute a lambda expression that handles incoming requests and calls the handleRequest method of the ConfigureComponent
        RequestHandler requestHandler = (request) -> {
            filterChain.doFilter(request, (req, res) -> {
                component.handleRequest(req);
                res.setStatus(200);
            });
        };

        // Add the request handler to the application's request pipeline
        Application.setRequestHandler(requestHandler);
    }

    public void onStart() {
        configurePipeline();
    }
}