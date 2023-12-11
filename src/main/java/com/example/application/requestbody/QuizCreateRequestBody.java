package com.example.application.requestbody;

import com.example.application.entities.quiz.Difficulty;
import com.example.application.entities.quiz.QuizTag;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Data;
import lombok.ToString;

import java.util.List;

@Data
@Builder
@ToString
public class QuizCreateRequestBody {
    @Size(min = 1, max = 255)
    private String quizTitle;
    @Size(min = 1, max = 4096)
    private String quizSynopsis;
    private String quizProfileImage;
    @NotNull
    private List<QuestionCreatedRequestBody> questions;
    @NotNull
    private Difficulty difficulty;
    @NotNull
    private QuizTag quizTags;
}
