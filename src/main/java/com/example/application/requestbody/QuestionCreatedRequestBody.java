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
    @NotEmpty
    private QuestionType type;
    @NotNull
    @NotEmpty
    private List<String> answers;
    @NotNull
    @NotEmpty
    private AnswerSelectionType answerType;
    @NotEmpty
    @NotNull
    private List<Integer> correctAnswers;
    @NotNull
    @NotEmpty
    @Size(min = 1)
    private String correctMessage;
    @NotNull
    @NotEmpty
    @Size(min = 1)
    private String wrongMessage;
    @NotNull
    @NotEmpty
    @Size(min = 1)
    private String explanation;
    @NotNull
    @NotEmpty
    private int points;
}
