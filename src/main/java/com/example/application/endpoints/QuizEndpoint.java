package com.example.application.endpoints;

import com.example.application.entities.quiz.Quiz;
import com.example.application.requestbody.QuizCreateRequestBody;
import com.example.application.service.quiz.QuizService;
import dev.hilla.Endpoint;
import jakarta.annotation.security.PermitAll;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Endpoint
@RequiredArgsConstructor
@PermitAll
public class QuizEndpoint {
    private final QuizService quizService;
    public List<Quiz> getAllQuizzes() {
        return quizService.getAllQuizzes();
    }

    public void createQuiz(QuizCreateRequestBody quizCreateRequestBody) {
            quizService.createQuiz(quizCreateRequestBody);
    }

    public Quiz getQuiz(Integer quizID) {
        return quizService.getQuiz(quizID);
    }
}
