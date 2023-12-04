package com.example.application.endpoints;

import com.example.application.entities.faq.FAQ;
import com.example.application.repositories.FAQRepository;
import dev.hilla.Endpoint;
import dev.hilla.crud.CrudRepositoryService;
import jakarta.annotation.security.RolesAllowed;

@RolesAllowed("ADMIN")
@Endpoint
public class FAQAdminEndpoint extends CrudRepositoryService<FAQ, Long, FAQRepository> {
}
