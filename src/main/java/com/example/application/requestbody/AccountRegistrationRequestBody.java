package com.example.application.requestbody;

import com.example.application.custombeanvalidator.MinAge;
import com.example.application.entities.user.Gender;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

public class AccountRegistrationRequestBody {
    @NotNull(message = "Username can't be empty")
    @Size(min = 3, message = "Username must need be at least 3 char long")
    public String username;
    @NotNull(message = "Name can't be empty")
    @Size(min = 3, message = "Name must be 3 char long")
    public String name;
    @Size(min = 3, max = 54)
    @NotNull
    public String password;
    @Size(min = 3, max = 54)
    @NotNull
    public String confirmPassword;
    @Email
    @Size(min = 5, max = 65)
    public String email;
    public String profilePictureUlr;
    public String phoneNumber;
    @MinAge(minAge = 13)
    public LocalDate dateOfBirth;
    public String userBio;
    public String address;
    @NotNull
    public Gender gender;
}
