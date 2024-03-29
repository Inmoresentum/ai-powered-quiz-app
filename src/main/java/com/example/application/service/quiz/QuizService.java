package com.example.application.service.quiz;

import com.example.application.entities.quiz.Question;
import com.example.application.entities.quiz.Quiz;
import com.example.application.exceptions.FileContainsHarmFulContentException;
import com.example.application.exceptions.MinIOFileCreationException;
import com.example.application.exceptions.MinIOFileNotFoundException;
import com.example.application.exceptions.QuizNotFoundException;
import com.example.application.repositories.QuizRepository;
import com.example.application.requestbody.QuizCreateRequestBody;
import com.example.application.response.QuestionDTO;
import com.example.application.response.QuizDTO;
import com.example.application.response.QuizResponseToClient;
import com.example.application.security.AuthenticatedUser;
import com.example.application.service.minio.MinioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class QuizService {
   private final QuizRepository quizRepository;
   private final MinioService minioService;
   private final AuthenticatedUser authenticatedUser;

   public void createQuiz(QuizCreateRequestBody quizCreateRequestBody) {
      List<Question> questions = new ArrayList<>();
      for (var questionRequestBody : quizCreateRequestBody.getQuestions()) {
           var question = Question.builder()
                   .point((double) questionRequestBody.getPoints())
                   .answers(questionRequestBody.getAnswers())
                   .question(questionRequestBody.getTitle())
                   .questionType(questionRequestBody.getType())
                   .explanation(questionRequestBody.getExplanation())
                   .answerSelectionType(questionRequestBody.getAnswerType())
                   .messageForCorrectAnswer(questionRequestBody.getCorrectMessage())
                   .messageForIncorrectAnswer(questionRequestBody.getWrongMessage())
                   .correctAnswer(questionRequestBody.getCorrectAnswers())
                   .build();
           questions.add(question);
       }

      var quiz = Quiz.builder()
              .createdBy(authenticatedUser.get().orElseThrow())
              .quizTitle(quizCreateRequestBody.getQuizTitle())
              .quizSynopsis(quizCreateRequestBody.getQuizSynopsis())
              .curQuizTag(quizCreateRequestBody.getQuizTags())
              .quizProfilePhotoUrl(quizCreateRequestBody.getQuizProfileImage())
              .questions(questions)
              .difficultyLevel(quizCreateRequestBody.getDifficulty())
              .build();

      quizRepository.save(quiz);
   }

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

   public List<Quiz> getAllQuizzes() {
      return quizRepository.findAll();
   }

   public Quiz getQuiz(Integer quizID) {
      if (!quizRepository.existsById(quizID)) {
         throw new QuizNotFoundException("No Quiz with this ID found!");
      }
      return quizRepository.findById(quizID).orElseThrow();
   }

   public ResponseEntity<?> getQuizById(Integer quizId) {
      var quiz = quizRepository.findById(quizId);
      if (quiz.isEmpty()) {
         return ResponseEntity.status(404).body(
                 QuizResponseToClient.builder()
                         .message("Server was unable to find this quiz with id " + quizId)
                         .build()
         );
      }

      List<QuestionDTO> questionDTOs = quiz.get().getQuestions().stream()
              .map(question -> QuestionDTO.builder()
                      .question(question.getQuestion())
                      .questionType(question.getQuestionType().name().toLowerCase())
                      .questionPic(question.getQuestionPic())
                      .answerSelectionType(question.getAnswerSelectionType().name().toLowerCase())
                      .answers(question.getAnswers())
                      .correctAnswer(question.getCorrectAnswer())
                      .messageForCorrectAnswer(question.getMessageForCorrectAnswer())
                      .messageForIncorrectAnswer(question.getMessageForIncorrectAnswer())
                      .explanation(question.getExplanation())
                      .point(question.getPoint())
                      .build())
              .collect(Collectors.toList());

      var quizDTO = QuizDTO.builder()
              .quizTitle(quiz.get().getQuizTitle())
              .quizSynopsis(quiz.get().getQuizSynopsis())
              .nrOfQuestions(quiz.get().getQuestions().size())
              .questions(questionDTOs)
              .createdByLastname(quiz.get().getCreatedBy().getUsername())
              .quizId(quiz.get().getQuizId())
              .build();

      System.out.println(quizDTO);
      var demoQuizResponse = QuizResponseToClient.builder()
              .message("Success. Here is the quiz")
              .quiz(quizDTO)
              .build();
      return ResponseEntity.ok(demoQuizResponse);
   }
}
