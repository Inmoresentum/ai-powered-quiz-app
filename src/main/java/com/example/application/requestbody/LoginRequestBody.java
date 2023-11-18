package com.example.application.requestbody;

import jakarta.validation.constraints.NotNull;

public class LoginRequestBody {
    @NotNull(message = "Username can't be null or empty")
    public String username;
    @NotNull(message = "Password can't be null or empty")
    public String password;
}
