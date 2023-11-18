package com.example.application.endpoints;

import com.example.application.entities.user.User;
import com.example.application.repositories.UserRepository;
import com.example.application.requestbody.LoginRequestBody;
import com.example.application.security.AuthenticatedUser;
import com.example.application.service.UserService;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.Endpoint;

import java.util.Optional;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.apache.logging.log4j.Level;

@Endpoint
@AnonymousAllowed
@RequiredArgsConstructor
@Log4j2
public class UserEndpoint {

    private final AuthenticatedUser authenticatedUser;
    private final UserService userService;
    public Optional<User> getAuthenticatedUser() {
        return authenticatedUser.get();
    }

    public Boolean isNotAccountVerified(String username) {
        return userService.isNotAccountVerified(username);
    }

    public Boolean isDisabledByAdmin(String username) {
        return userService.isDisabledByAdmin(username);
    }

    public void generateUserLoginFormValidations(LoginRequestBody requestBody) {
        log.log(Level.DEBUG, "Generating the validations");
    }
}
