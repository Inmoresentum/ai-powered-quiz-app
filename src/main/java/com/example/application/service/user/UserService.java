package com.example.application.service.user;

import com.example.application.entities.user.User;
import com.example.application.exceptions.FileContainsHarmFulContentException;
import com.example.application.exceptions.MinIOFileCreationException;
import com.example.application.exceptions.MinIOFileNotFoundException;
import com.example.application.repositories.UserRepository;

import java.io.IOException;
import java.util.Optional;
import java.util.UUID;

import com.example.application.service.minio.MinioService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.apache.logging.log4j.Level;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@Service
@Log4j2
public class UserService {

    private final UserRepository userRepository;
    private final MinioService minioService;

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

    public Boolean userExistsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    public Boolean userExistsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    public String saveUserProfileImage(MultipartFile image) throws MinIOFileCreationException, IOException, FileContainsHarmFulContentException {
        log.log(Level.DEBUG, image.getContentType());
        System.out.println(image.getContentType());
        String uuiHash = UUID.randomUUID().toString();
        String hashedFileName = uuiHash + "--" + image.getOriginalFilename();
        // todo: get these from an environment variable instead of hard coding
        String baseUrl = "http://localhost:8080/api/v2/storage/image/user/";
        String clientURL = baseUrl + hashedFileName;
        minioService.putObject("/user/" + hashedFileName, image);
        return clientURL;
    }

    public byte[] getUserProfileImage(String imageName) throws MinIOFileNotFoundException {
        return minioService.getObject("/user/" + imageName);
    }
}
