package com.example.application.requestbody;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;

public class ResetPasswordRequestBody {
    @Email
    @Size(min = 3, max = 128)
    public String email;
}
