package com.example.application.repositories;


import com.example.application.entities.user.User;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.lang.NonNull;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long>, JpaSpecificationExecutor<User> {
    boolean existsByEmail(@NonNull String email);
    boolean existsByUsername(@NonNull String email);

    User findByUsername(@NotNull String username);
    Optional<User> findByEmail(String email);
}
