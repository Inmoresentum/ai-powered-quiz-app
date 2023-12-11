package com.example.application.requestbody;

import com.example.application.entities.quiz.AnswerSelectionType;
import com.example.application.entities.quiz.QuestionType;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class QuestionCreatedRequestBody {
    @Size(min = 1, max = 256)
    private String title;
    @NotNull
    private QuestionType type;
    @NotNull
    @NotEmpty
    private List<String> answers;
    @NotNull
    private AnswerSelectionType answerType;
    @NotEmpty
    @NotNull
    private List<Integer> correctAnswers;
    @NotNull
    @NotEmpty
    private String correctMessage;
    @NotNull
    @NotEmpty
    private String wrongMessage;
    @NotNull
    @NotEmpty
    private String explanation;
    @NotNull
    @NotEmpty
    private int points;
}
