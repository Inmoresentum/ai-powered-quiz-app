package com.example.application.service.leaderboard;

import com.example.application.entities.leaderboard.GlobalLeaderBoard;
import com.example.application.entities.leaderboard.GlobalRank;
import com.example.application.entities.user.User;
import com.example.application.repositories.GlobalLeaderBoardRepository;
import com.example.application.security.AuthenticatedUser;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GlobalLeaderboardService {
    private final GlobalLeaderBoardRepository globalLeaderBoardRepository;
    private final AuthenticatedUser authenticatedUser;

    public void saveScore(Integer score, Integer quizId) {
        User user = authenticatedUser.get().orElseThrow();
        if (globalLeaderBoardRepository.existsByUser(user)) {
            var globalLeaderBoardByUser = globalLeaderBoardRepository.findGlobalLeaderBoardByUser(user);
            globalLeaderBoardByUser.setScore((long) score + globalLeaderBoardByUser.getScore());
            if (globalLeaderBoardByUser.getScore() > 2000) {
                globalLeaderBoardByUser.setGlobalRank(GlobalRank.AMATEUR);
            }
            else if (globalLeaderBoardByUser.getScore() > 6000) {
                globalLeaderBoardByUser.setGlobalRank(GlobalRank.AVERAGE);
            }
            else if (globalLeaderBoardByUser.getScore() > 12000) {
                globalLeaderBoardByUser.setGlobalRank(GlobalRank.GENIUS);
            }
            globalLeaderBoardRepository.save(globalLeaderBoardByUser);
            return;
        }
        GlobalLeaderBoard globalLeaderBoard = GlobalLeaderBoard.builder()
                .user(user)
                .score((long) score)
                .globalRank(GlobalRank.BEGINNER)
                .build();
        globalLeaderBoardRepository.save(globalLeaderBoard);
    }
}
