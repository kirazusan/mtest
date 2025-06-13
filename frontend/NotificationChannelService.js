

package frontend;

import java.io.IOException;
import java.util.concurrent.CompletableFuture;

import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.Entity;
import javax.ws.rs.client.WebTarget;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.fasterxml.jackson.databind.ObjectMapper;

public class NotificationChannelService {
    private Client client;
    private ObjectMapper objectMapper;

    public NotificationChannelService() {
        client = ClientBuilder.newClient();
        objectMapper = new ObjectMapper();
    }

    public CompletableFuture<String> createNotificationChannel(NotificationChannel notificationChannel) {
        return CompletableFuture.supplyAsync(() -> {
            try {
                WebTarget target = client.target("/api/notification-channels");
                Response response = target.request(MediaType.APPLICATION_JSON)
                        .post(Entity.entity(objectMapper.writeValueAsString(notificationChannel), MediaType.APPLICATION_JSON));

                if (response.getStatus() == 201) {
                    String responseBody = response.readEntity(String.class);
                    // Update the state accordingly
                    return responseBody;
                } else {
                    throw new RuntimeException("Failed to create notification channel");
                }
            } catch (IOException e) {
                throw new RuntimeException("Error creating notification channel", e);
            }
        });
    }
}

class NotificationChannel {
    // Add properties and getters/setters as needed
}