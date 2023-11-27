package com.example.application.endpoints;

import com.example.application.entities.faq.FAQ;
import com.example.application.service.faq.FAQService;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.Endpoint;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Endpoint
@AnonymousAllowed
@RequiredArgsConstructor
public class FAQEndpoint {
    private final FAQService faqService;
    public String sayHello(String name) {
        if (name.isEmpty()) {
            return "Hello stranger";
        } else {
            return "Hello " + name;
        }
    }

    public List<FAQ> findFirstTenFAQs() {
        return faqService.findFirstTenFAQs();
    }
    public List<FAQ> findAllFAQs() {
        return faqService.findAllFAQs();
    }
}
