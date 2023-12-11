package com.example.application.controller;

import com.example.application.exceptions.FileContainsHarmFulContentException;
import com.example.application.exceptions.MinIOFileCreationException;
import com.example.application.exceptions.MinIOFileNotFoundException;
import com.example.application.service.quiz.QuizService;
import com.example.application.service.user.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/api/v2/storage")
@Log4j2
@RequiredArgsConstructor
public class FileStorageController {
    private final UserService userService;
    private final QuizService  quizService;
    @PostMapping(value = "/image/user-profile",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<?> uploadUserProfileImageToMinIO(@RequestParam("image") MultipartFile imageData) {
        try {
            String url = userService.saveUserProfileImage(imageData);
            return ResponseEntity.status(201).
                    body(Map.of("image_url", url));
        } catch (MinIOFileCreationException | IOException e) {
            return ResponseEntity.status(521)
                    .body(Map.of("message", "Failed to create the file " + imageData.getOriginalFilename()));
        } catch (FileContainsHarmFulContentException e) {
            return ResponseEntity.status(409)
                    .body(Map.of("message", "The File contains harmful content " + imageData.getOriginalFilename()));
        }
    }

    @PostMapping(value = "/image/quiz-image",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<?> uploadQuizImageToMinIO(@RequestParam("image") MultipartFile imageData) {
        try {
            String url = quizService.saveQuizImageToMinio(imageData);
            return ResponseEntity.status(201).
                    body(Map.of("image_url", url));
        } catch (MinIOFileCreationException | IOException e) {
            return ResponseEntity.status(521)
                    .body(Map.of("message", "Failed to create the file " + imageData.getOriginalFilename()));
        } catch (FileContainsHarmFulContentException e) {
            return ResponseEntity.status(409)
                    .body(Map.of("message", "The File contains harmful content " + imageData.getOriginalFilename()));
        }
    }
    @GetMapping(value = "/image/user/{filename}")
    public ResponseEntity<?> downloadUserImage(@PathVariable String filename) {
        try {
            return ResponseEntity.ok()
                    .contentType(MediaType.IMAGE_PNG)
                    .body(userService.getUserProfileImage(filename));
        } catch (MinIOFileNotFoundException e) {
            return ResponseEntity.status(404)
                    .body(Map.of("message", "Failed to retrieve the file : " + filename));
        }
    }

    @GetMapping(value = "/image/quiz/{filename}")
    public ResponseEntity<?> downloadQuizImage(@PathVariable String filename) {
        try {
            return ResponseEntity.ok()
                    .contentType(MediaType.IMAGE_PNG)
                    .body(quizService.getQuizImage(filename));
        } catch (MinIOFileNotFoundException e) {
            return ResponseEntity.status(404)
                    .body(Map.of("message", "Failed to retrieve the file : " + filename));
        }
    }
}
