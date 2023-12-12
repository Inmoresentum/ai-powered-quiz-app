package com.example.application.entities.quiz;

import dev.hilla.Nullable;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.proxy.HibernateProxy;

import java.util.List;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Question {
    @Id
    @GeneratedValue
    private int questionId;
    @NotEmpty
    @NotNull
    private String question;
    @NotNull
    private QuestionType questionType;
    @Nullable
    private String questionPic;// it's optional
    @NotNull
    private AnswerSelectionType answerSelectionType;
    @ElementCollection(fetch = FetchType.EAGER)
    @NotEmpty
    @NotNull
    private List<String> answers;
    @ElementCollection(fetch = FetchType.EAGER)
    @NotEmpty
    @NotNull
    private List<Integer> correctAnswer;
    @NotEmpty
    @NotNull
    private String messageForCorrectAnswer;
    @NotEmpty
    @NotNull
    private String messageForIncorrectAnswer;
    @NotEmpty
    @NotNull
    private String explanation;
    @NotNull
    private Double point;

    @Override
    public final boolean equals(Object o) {
        if (this == o) return true;
        if (o == null) return false;
        Class<?> oEffectiveClass = o instanceof HibernateProxy ? ((HibernateProxy) o)
                .getHibernateLazyInitializer()
                .getPersistentClass() : o.getClass();
        Class<?> thisEffectiveClass = this instanceof HibernateProxy ? ((HibernateProxy) this)
                .getHibernateLazyInitializer()
                .getPersistentClass() : this.getClass();
        if (thisEffectiveClass != oEffectiveClass) return false;
        return false;
    }

    @Override
    public final int hashCode() {
        return getClass().hashCode();
    }
}