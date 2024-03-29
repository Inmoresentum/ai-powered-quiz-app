package com.example.application.repositories;

import com.example.application.entities.faq.FAQ;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface FAQRepository extends JpaRepository<FAQ, Long>, JpaSpecificationExecutor<FAQ> {
    @Transactional
    @Modifying
    @Query("update FAQ f set f.question = ?1, f.answers = ?2 where f.id = ?3")
    void updateFAQ(@NonNull String question, @NonNull String answers, @NonNull Long id);
}
