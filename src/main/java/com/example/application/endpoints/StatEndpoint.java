package com.example.application.endpoints;

import com.example.application.repositories.QuizRepository;
import com.example.application.repositories.UserRepository;
import dev.hilla.Endpoint;
import jakarta.annotation.security.RolesAllowed;
import lombok.RequiredArgsConstructor;

@Endpoint
@RolesAllowed("ADMIN")
@RequiredArgsConstructor
public class StatEndpoint {
    private final QuizRepository quizRepository;
    private final UserRepository userRepository;

    public long getTotalNumberOfQuizzes() {
        return quizRepository.count();
    }

    public long getTotalNumberOfUsers() {
        return userRepository.count();
    }
}
