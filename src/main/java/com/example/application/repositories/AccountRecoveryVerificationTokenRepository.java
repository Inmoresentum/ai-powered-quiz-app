package com.example.application.repositories;


import com.example.application.entities.tokens.AccountRecoveryVerificationToken;
import com.example.application.entities.tokens.AccountVerificationToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AccountRecoveryVerificationTokenRepository
        extends JpaRepository<AccountRecoveryVerificationToken, Long> {
    boolean existsByToken(String token);
    AccountRecoveryVerificationToken findByToken(String token);
}
