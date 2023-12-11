package com.example.application.endpoints;

import com.example.application.entities.quiz.Quiz;
import com.example.application.requestbody.QuizCreateRequestBody;
import com.example.application.service.quiz.QuizService;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.Endpoint;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Endpoint
@RequiredArgsConstructor
@AnonymousAllowed
public class QuizEndpoint {
    private final QuizService quizService;
    public List<Quiz> getAllQuizzes() {
        return quizService.getAllQuizzes();
    }

    public void createQuiz(QuizCreateRequestBody quizCreateRequestBody) {
        System.out.println(quizCreateRequestBody);
    }

    public Quiz getQuiz(Integer quizID) {
        return quizService.getQuiz(quizID);
    }
}
