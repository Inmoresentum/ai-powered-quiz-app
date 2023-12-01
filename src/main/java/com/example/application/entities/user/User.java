package com.example.application.entities.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Table(name = "application_user")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User extends AbstractEntity {
    private String username;
    private String name;
    @JsonIgnore
    private String hashedPassword;
    @Enumerated(EnumType.STRING)
    @ElementCollection(fetch = FetchType.EAGER)
    private Set<Role> roles;
    @Size(min = 5, max = 65)
    @Column(nullable = false, unique = true)
    private String email;
    @Column(name = "profile_pic_url")
    private String profilePictureUlr;
    @Size(min = 4, max = 34)
    private String phoneNumber;
    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;
    private boolean accountVerified = false;
    private boolean deactivatedByAdmin = false;
    @Column(columnDefinition = "TEXT")
    private String userBio;

    @Column(name = "user_address")
    private String address;

    @Column(name = "user_gender")
    @Enumerated(EnumType.STRING)
    private Gender gender;
    @CreatedDate
    @Column(columnDefinition = "DATETIME")
    private LocalDateTime accountCreated;
    @Column(nullable = false, name = "Privacy_Policy_And_TOS_Agreement")
    private boolean agreesWithTermsOfServicesAndPrivacyAndPolicy;

    private boolean activeSubscriber = false;
    @Enumerated(EnumType.STRING)
    private PricingPlanTitle pricingPlanTitle = PricingPlanTitle.FREE;
}
