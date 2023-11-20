package com.example.application.entities.user;

import jakarta.validation.constraints.NotNull;

@NotNull
public enum Gender {
    MALE, FEMALE, OTHER
}
