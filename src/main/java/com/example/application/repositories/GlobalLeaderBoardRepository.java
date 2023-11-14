package com.example.application.repositories;

import com.example.application.entities.leaderboard.GlobalLeaderBoard;
import com.example.application.entities.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface GlobalLeaderBoardRepository
        extends JpaRepository<GlobalLeaderBoard, Long>,
        JpaSpecificationExecutor<GlobalLeaderBoard> {

    boolean existsByUser(User user);
    GlobalLeaderBoard findGlobalLeaderBoardByUser(User user);
}