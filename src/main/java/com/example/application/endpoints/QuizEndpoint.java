package com.example.application.endpoints;

import com.example.application.entities.quiz.Quiz;
import com.example.application.requestbody.QuizCreateRequestBody;
import com.example.application.service.leaderboard.GlobalLeaderboardService;
import com.example.application.service.quiz.QuizService;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.Endpoint;
import jakarta.annotation.security.PermitAll;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Endpoint
@RequiredArgsConstructor
@AnonymousAllowed
public class QuizEndpoint {
    private final QuizService quizService;
    private final GlobalLeaderboardService globalLeaderboardService;

    public List<Quiz> getAllQuizzes() {
        return quizService.getAllQuizzes();
    }

    @PermitAll
    public void createQuiz(QuizCreateRequestBody quizCreateRequestBody) {
            quizService.createQuiz(quizCreateRequestBody);
    }

    @PermitAll
    public Quiz getQuiz(Integer quizID) {
        return quizService.getQuiz(quizID);
    }

    @PermitAll
    public void saveScore(Integer quizID, Integer score) {
        globalLeaderboardService.saveScore(score, quizID);
    }
}
