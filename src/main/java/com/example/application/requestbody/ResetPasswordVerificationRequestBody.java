package com.example.application.requestbody;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class ResetPasswordVerificationRequestBody {
    @NotNull
    @Size(min = 3, max = 128)
    public String newPassword;
    @NotNull
    @Size(min = 3, max = 128)
    public String confirmNewPassword;
    @NotNull
    public String passwordResetVerificationToken;
}
