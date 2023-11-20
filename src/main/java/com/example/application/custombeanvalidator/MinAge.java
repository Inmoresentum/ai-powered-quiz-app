package com.example.application.custombeanvalidator;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import jakarta.validation.constraints.Past;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.*;

@Target({ METHOD, FIELD, ANNOTATION_TYPE, CONSTRUCTOR, PARAMETER, TYPE_USE })
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = MinAgeConstraintValidator.class)
public @interface MinAge {

    String message() default "Date of birth must be at least ${minAge} years older than the specified minimum age.";

    int minAge() default 18;

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
