package com.example.application.endpoints;

import com.example.application.entities.quiz.Quiz;
import com.example.application.repositories.QuizRepository;
import dev.hilla.Endpoint;
import dev.hilla.crud.CrudRepositoryService;
import jakarta.annotation.security.RolesAllowed;

@Endpoint
@RolesAllowed("ADMIN")
public class QuizAdminEndpoint extends CrudRepositoryService<Quiz, Integer, QuizRepository> {
}
