package com.example.application.service.faq;

import com.example.application.entities.faq.FAQ;
import com.example.application.repositories.FAQRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Log4j2
public class FAQService {
    private final FAQRepository faqRepository;

    public List<FAQ> findFirstTenFAQs() {
        return faqRepository.findAll(PageRequest.of(0, 10)).getContent();
    }
}
