package com.example.application.endpoints;

import com.example.application.entities.user.User;
import com.example.application.requestbody.AccountRegistrationRequestBody;
import com.example.application.requestbody.LoginRequestBody;
import com.example.application.requestbody.ResetPasswordRequestBody;
import com.example.application.requestbody.ResetPasswordVerificationRequestBody;
import com.example.application.security.AuthenticatedUser;
import com.example.application.service.user.UserService;
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

    public Boolean userExistsByEmail(String email) {
        return userService.userExistsByEmail(email);
    }

    public Boolean userExistsByUsername(String username) {
        return userService.userExistsByUsername(username);
    }

    public void registerUser(AccountRegistrationRequestBody accountRegistrationRequestBody) {
        userService.registerUser(accountRegistrationRequestBody);
    }

    public void verifyUserAccount(String token) {
        userService.verifyUserAccount(token);
    }

    public void forgotPassword(ResetPasswordRequestBody resetPasswordRequestBody) {
        userService.createForgotPasswordVerificationLink(resetPasswordRequestBody.email);
    }

    public void resetAccountPassword(ResetPasswordVerificationRequestBody resetPasswordVerificationRequestBody) {
        userService.verifyForgotPasswordVerificationToken(resetPasswordVerificationRequestBody);
    }

    public void generateUserLoginFormValidations(LoginRequestBody requestBody) {
        log.log(Level.DEBUG, "Generating the validations");
    }
}
