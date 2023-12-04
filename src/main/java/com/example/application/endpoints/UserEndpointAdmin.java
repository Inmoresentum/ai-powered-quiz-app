package com.example.application.endpoints;

import com.example.application.entities.user.User;
import com.example.application.repositories.UserRepository;
import dev.hilla.Endpoint;
import dev.hilla.Nullable;
import dev.hilla.crud.CrudRepositoryService;
import jakarta.annotation.security.RolesAllowed;

@RolesAllowed("ADMIN")
@Endpoint
public class UserEndpointAdmin extends CrudRepositoryService<User, Long, UserRepository> {
    @Override
    public @Nullable User save(User value) {
        return super.save(value);
    }
}
