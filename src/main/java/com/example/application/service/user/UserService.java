package com.example.application.service.user;

import com.example.application.entities.tokens.AccountRecoveryVerificationToken;
import com.example.application.entities.tokens.AccountVerificationToken;
import com.example.application.entities.user.Role;
import com.example.application.entities.user.User;
import com.example.application.exceptions.FileContainsHarmFulContentException;
import com.example.application.exceptions.MinIOFileCreationException;
import com.example.application.exceptions.MinIOFileNotFoundException;
import com.example.application.repositories.AccountRecoveryVerificationTokenRepository;
import com.example.application.repositories.AccountVerificationTokenRepository;
import com.example.application.repositories.UserRepository;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

import com.example.application.requestbody.AccountRegistrationRequestBody;
import com.example.application.requestbody.ResetPasswordVerificationRequestBody;
import com.example.application.service.EmailService;
import com.example.application.service.EmailUtils;
import com.example.application.service.minio.MinioService;
import dev.hilla.exception.EndpointException;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.apache.logging.log4j.Level;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@Service
@Log4j2
@Transactional
public class UserService {
    private final AccountVerificationTokenRepository accountVerificationTokenRepository;
    private final UserRepository userRepository;
    private final MinioService minioService;
    private final PasswordEncoder encoder;
    private final EmailService emailService;
    private final EmailUtils emailUtils;
    private final AccountRecoveryVerificationTokenRepository accountRecoveryVerificationTokenRepository;

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

    public void registerUser(AccountRegistrationRequestBody accountRegistrationRequestBody) {
        // todo: use model mapper to reduce the boilerplate codes
        var user = User.builder()
                .username(accountRegistrationRequestBody.username)
                .name(accountRegistrationRequestBody.name)
                .hashedPassword(encoder.encode(accountRegistrationRequestBody.password))
                .roles(findUserRole(accountRegistrationRequestBody.email))
                .email(accountRegistrationRequestBody.email)
                .profilePictureUlr(accountRegistrationRequestBody.profilePictureUlr)
                .phoneNumber(accountRegistrationRequestBody.phoneNumber)
                .dateOfBirth(accountRegistrationRequestBody.dateOfBirth)
                .userBio(accountRegistrationRequestBody.userBio)
                .address(accountRegistrationRequestBody.address)
                .gender(accountRegistrationRequestBody.gender)
                .accountCreated(LocalDateTime.now())
                .agreesWithTermsOfServicesAndPrivacyAndPolicy(true)
                .build();

        userRepository.save(user);

        final String ACTIVATION_TOKEN = UUID.randomUUID().toString();
        //Todo: Use an Environment variable instead
        final String EMAIL_VERIFICATION_URL = "http://localhost:8080/auth/verify/account/activate?token=";
        final String ACTIVATION_LINK = EMAIL_VERIFICATION_URL.concat(ACTIVATION_TOKEN);
        // Also, have to save this activation token in the token repository.
        AccountVerificationToken userVerificationToken = new AccountVerificationToken(ACTIVATION_TOKEN,
                LocalDateTime.now(), LocalDateTime.now().plusHours(3), user);

        // Saving the token
        accountVerificationTokenRepository.save(userVerificationToken);
        emailService.send(user.getEmail(), "Account Activation", emailUtils
                .buildAccountConfirmationEmail(user.getName(), ACTIVATION_LINK));
    }

    private Set<Role> findUserRole(String email) {
        return email.split("@")[1].equals("g.bracu.ac.bd") ? Set.of(Role.ADMIN) : Set.of(Role.USER);
    }

    public void verifyUserAccount(String token) {
        var optionalUserVerificationToken =
                accountVerificationTokenRepository.findByToken(token);
        if (optionalUserVerificationToken.isEmpty()) {
            throw new EndpointException("The link is broken");
        }

        var userVerificationToken = optionalUserVerificationToken.get();

        if (userVerificationToken.getConfirmedAt() != null) {
            throw new EndpointException("This link has already been used");
        }

        // Verify it later.
        LocalDateTime expireAt = userVerificationToken.getExpiresAt();
        if (LocalDateTime.now().isAfter(expireAt)) {
            throw new EndpointException("This link has expired");
        }

        accountVerificationTokenRepository.updateConfirmedAt(token,
                LocalDateTime.now());

        User user = userVerificationToken.getUser();
        user.setAccountVerified(true);
        userRepository.save(user);
    }

    public void createForgotPasswordVerificationLink(String email) {
        final String forgotPasswordVerificationToken = UUID.randomUUID().toString();
        final String EMAIL_VERIFICATION_URL = "http://localhost:8080/auth/verify/account/forgot-password?token=";
        final String resetLink = EMAIL_VERIFICATION_URL.concat(forgotPasswordVerificationToken);
        var user = userRepository.findByEmail(email);
        if (user.isEmpty()) throw new EndpointException("No user Registered with this email");

        AccountRecoveryVerificationToken verificationToken = AccountRecoveryVerificationToken
                .builder()
                .token(forgotPasswordVerificationToken)
                .user(user.get())
                .createdAt(LocalDateTime.now())
                .expiresAt(LocalDateTime.now().plusHours(10))
                .build();
        accountRecoveryVerificationTokenRepository.save(verificationToken);

        emailService.send(user.get().getEmail(), "Password Reset Link",
                emailUtils.buildPasswordResetRequestEmail(user.get().getUsername(), resetLink));
    }

    public void verifyForgotPasswordVerificationToken(ResetPasswordVerificationRequestBody resetPasswordVerificationRequestBody) {
        if (!accountRecoveryVerificationTokenRepository.existsByToken(resetPasswordVerificationRequestBody.passwordResetVerificationToken)) {
            throw new EndpointException("The link is broken");
        }
        var verificationToken = accountRecoveryVerificationTokenRepository.findByToken(resetPasswordVerificationRequestBody.passwordResetVerificationToken);
        if (verificationToken.getExpiresAt().isBefore(LocalDateTime.now())) {
            throw new EndpointException("This is has already expired");
        }

        User user = verificationToken.getUser();
        user.setHashedPassword(encoder.encode(resetPasswordVerificationRequestBody.newPassword));
        userRepository.save(user);

        verificationToken.setConfirmedAt(LocalDateTime.now());

        emailService.send(user.getEmail(), "Password Reset Successful!",
                emailUtils.buildPasswordChangeNotifierEmail(user.getUsername(), "http://localhost:8080/auth/forgot/password"));
    }
}
