package com.example.application.endpoints;

import com.example.application.entities.leaderboard.GlobalLeaderBoard;
import com.example.application.repositories.GlobalLeaderBoardRepository;
import com.example.application.service.leaderboard.GlobalLeaderboardService;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.Endpoint;
import dev.hilla.crud.ListRepositoryService;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Endpoint
@RequiredArgsConstructor
@AnonymousAllowed
public class LeaderboardEndpoint extends ListRepositoryService<GlobalLeaderBoard, Long, GlobalLeaderBoardRepository> {
}
