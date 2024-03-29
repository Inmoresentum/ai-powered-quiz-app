package com.example.application.entities.leaderboard;

import com.example.application.entities.user.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@Entity
@Table(name = "global_leader_board")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GlobalLeaderBoard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;
    @Column(nullable = false)
    private Long score = 0L;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "user_id")
    private User user;

    @NotNull(message = "Rank Can't be Null")
    @Enumerated
    @Column(name = "global_rank")
    private GlobalRank globalRank;

    @Version
    @Column(name = "version")
    private Integer version;
}