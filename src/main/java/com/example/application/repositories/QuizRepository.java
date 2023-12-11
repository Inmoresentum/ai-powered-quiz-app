package com.example.application.repositories;

import com.example.application.entities.quiz.Quiz;
import com.example.application.entities.quiz.QuizTag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface QuizRepository extends JpaRepository<Quiz, Integer> {
    List<Quiz> findAllByCurQuizTag(QuizTag curQuizTag);
    List<Quiz> findAllByQuizTitleContainingIgnoreCase(String searchParams);
}