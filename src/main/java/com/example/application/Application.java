package com.example.application;

import com.example.application.entities.user.Gender;
import com.example.application.entities.user.Role;
import com.example.application.entities.user.User;
import com.example.application.repositories.UserRepository;
import com.vaadin.flow.component.page.AppShellConfigurator;
import com.vaadin.flow.theme.Theme;


import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Set;

/**
 * The entry point of the Spring Boot application.
 * Use the @PWA annotation make the application installable on phones, tablets
 * and some desktop browsers.
 */
@SpringBootApplication
@Theme(value = "ai-powered-quiz-app")
@EnableScheduling
@EnableAsync
public class Application implements AppShellConfigurator {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @Bean
    CommandLineRunner commandLineRunner(UserRepository userRepository, PasswordEncoder encoder) {
        return args -> {
            var user = User.builder()
                    .accountCreated(LocalDateTime.now())
                    .username("user")
                    .hashedPassword(encoder.encode("admin"))
                    .name("User")
                    .roles(Set.of(Role.USER))
                    .accountVerified(false)
                    .email("user@mail.com")
                    .agreesWithTermsOfServicesAndPrivacyAndPolicy(true)
                    .deactivatedByAdmin(false)
                    .dateOfBirth(LocalDate.ofYearDay(1992, 224))
                    .phoneNumber("0783748937483")
                    .gender(Gender.MALE)
                    .build();

            userRepository.save(user);

            var admin = User.builder()
                    .accountCreated(LocalDateTime.now())
                    .username("admin")
                    .name("Admin")
                    .hashedPassword(encoder.encode("admin"))
                    .accountVerified(true)
                    .email("admin@mail.com")
                    .roles(Set.of(Role.ADMIN))
                    .agreesWithTermsOfServicesAndPrivacyAndPolicy(true)
                    .deactivatedByAdmin(false)
                    .dateOfBirth(LocalDate.ofYearDay(1992, 224))
                    .phoneNumber("0783748937483")
                    .gender(Gender.MALE)
                    .build();
            userRepository.save(admin);
        };
    }
}
