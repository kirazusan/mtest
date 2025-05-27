

#include <iostream>
#include <string>
#include <json/json.h>

class HelloService {
public:
    std::string getGreetingMessage() {
        return "Hello, World!";
    }
};

class HelloController {
public:
    Json::Value hello() {
        HelloService helloService;
        std::string greetingMessage = helloService.getGreetingMessage();
        Json::Value jsonData;
        jsonData["message"] = greetingMessage;
        return jsonData;
    }
};

int main() {
    HelloController helloController;
    Json::Value jsonData = helloController.hello();
    Json::StyledWriter writer;
    std::cout << writer.write(jsonData) << std::endl;
    return 0;
}