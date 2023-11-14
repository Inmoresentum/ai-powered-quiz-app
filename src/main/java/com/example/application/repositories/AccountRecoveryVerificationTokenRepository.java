package com.example.application.repositories;


import com.example.application.entities.tokens.AccountRecoveryVerificationToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRecoveryVerificationTokenRepository
        extends JpaRepository<AccountRecoveryVerificationToken, Long> {
}
