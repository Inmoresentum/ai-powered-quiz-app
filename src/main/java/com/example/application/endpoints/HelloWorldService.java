package com.example.application.endpoints;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.BrowserCallable;
import dev.hilla.Endpoint;
import org.springframework.stereotype.Service;

@Endpoint
@Service
public class HelloWorldService {

    public String sayHello(String name) {
        if (name.isEmpty()) {
            return "Hello stranger";
        } else {
            return "Hello " + name;
        }
    }
}
