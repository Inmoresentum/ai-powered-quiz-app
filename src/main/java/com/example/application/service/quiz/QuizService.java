package com.example.application.service.quiz;

import com.example.application.exceptions.FileContainsHarmFulContentException;
import com.example.application.exceptions.MinIOFileCreationException;
import com.example.application.exceptions.MinIOFileNotFoundException;
import com.example.application.repositories.QuizRepository;
import com.example.application.service.minio.MinioService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class QuizService {
   private final QuizRepository quizRepository;
   private final MinioService minioService;


   public String saveQuizImageToMinio(MultipartFile image) throws MinIOFileCreationException, FileContainsHarmFulContentException, IOException {
      String uuiHash = UUID.randomUUID().toString();
      String hashedFileName = uuiHash + "--" + image.getOriginalFilename();
      // todo: get these from an environment variable instead of hard coding
      String baseUrl = "http://localhost:8080/api/v2/storage/image/quiz/";
      String clientURL = baseUrl + hashedFileName;
      minioService.putObject("/quiz/" + hashedFileName, image);
      return clientURL;

   }

   public byte[] getQuizImage(String imageName) throws MinIOFileNotFoundException {
      return minioService.getObject("/quiz/" + imageName);
   }
}
