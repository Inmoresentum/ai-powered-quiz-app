package com.example.application.service;

import com.example.application.entities.user.User;
import com.example.application.repositories.UserRepository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Optional<User> get(Long id) {
        return userRepository.findById(id);
    }

    public Boolean isNotAccountVerified(String username) {
        var user = userRepository.findByUsername(username);
        return user != null && !user.isAccountVerified();
    }

    public Boolean isDisabledByAdmin(String username) {
        var user = userRepository.findByUsername(username);
        return user != null && user.isDeactivatedByAdmin();
    }
    public User update(User entity) {
        return userRepository.save(entity);
    }

    public void delete(Long id) {
        userRepository.deleteById(id);
    }

    public Page<User> list(Pageable pageable) {
        return userRepository.findAll(pageable);
    }

    public Page<User> list(Pageable pageable, Specification<User> filter) {
        return userRepository.findAll(filter, pageable);
    }

    public int count() {
        return (int) userRepository.count();
    }
}
