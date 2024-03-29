package com.example.application.entities.quiz;


import com.example.application.entities.user.User;
import dev.hilla.Nullable;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.proxy.HibernateProxy;

import java.util.List;
import java.util.Objects;

import static com.example.application.entities.quiz.Difficulty.EASY;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "Created Quiz")
public class Quiz {
    @Id
    @GeneratedValue
    private Integer quizId;
    @Column(nullable = false)
    @NotNull
    private String quizTitle;
    @Column(nullable = false)
    @NotNull
    private String quizSynopsis;
    @OneToMany(cascade = CascadeType.PERSIST)
    @ToString.Exclude
    @NotEmpty
    @NotNull
    private List<Question> questions;
    @Nullable
    private String quizProfilePhotoUrl;
    @Enumerated(EnumType.STRING)
    @NotNull
    private Difficulty difficultyLevel = EASY;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, name = "cur_quiz_tag")
    @NotNull
    private QuizTag curQuizTag;

    @ManyToOne
    @JoinColumn(name = "author_of_the_quiz")
    private User createdBy;

    @Override
    public final boolean equals(Object o) {
        if (this == o) return true;
        if (o == null) return false;
        Class<?> oEffectiveClass = o instanceof HibernateProxy ? ((HibernateProxy) o).getHibernateLazyInitializer().getPersistentClass() : o.getClass();
        Class<?> thisEffectiveClass = this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass() : this.getClass();
        if (thisEffectiveClass != oEffectiveClass) return false;
        Quiz quiz = (Quiz) o;
        return getQuizId() != null && Objects.equals(getQuizId(), quiz.getQuizId());
    }

    @Override
    public final int hashCode() {
        return getClass().hashCode();
    }
}
