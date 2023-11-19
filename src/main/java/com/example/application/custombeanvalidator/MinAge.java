package com.example.application.custombeanvalidator;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.FIELD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = MinAgeConstraintValidator.class)
public @interface MinAge {

    String message() default "Date of birth must be at least ${minAge} years older than the specified minimum age.";

    int minAge();

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
