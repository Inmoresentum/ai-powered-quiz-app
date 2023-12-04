package com.example.application.entities.faq;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

@Entity
@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FAQ {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "FAQ_id", nullable = false)
    private Long id;
    @Column(name = "FAQ_question", nullable = false, unique = true)
    @NotNull
    @Size(min = 5, max = 560)
    private String question;
    @Column(name = "FAQ_anwers", nullable = false,
            columnDefinition = "TEXT", unique = true)
    @NotNull
    @Size(min = 5, max = 5560)
    private String answers;
    @Version
    private Integer version;
}
