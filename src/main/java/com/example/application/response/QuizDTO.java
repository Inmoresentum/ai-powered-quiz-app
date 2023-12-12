package com.example.application.response;

import com.example.application.entities.quiz.Difficulty;
import com.example.application.entities.quiz.QuizTag;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QuizDTO {
    private String quizTitle;
    private String quizSynopsis;
    private Integer nrOfQuestions;
    @JsonProperty("questions")
    private List<QuestionDTO> questions;
    private Integer quizId;
    private String quizProfilePhotoUrl;
    private Difficulty difficultyLevel;
    private QuizTag curQuizTag;
    private Integer createdById;
    private String createdByUsername;
    private String createdByFirstname;
    private String createdByLastname;
    private String createdByEmail;
    private String createdByProfilePicUrl;
}
