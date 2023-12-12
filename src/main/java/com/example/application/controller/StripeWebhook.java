package com.example.application.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/stripe/all")
public class StripeWebhook {
    @PostMapping()
    public void allEvent(Object object) {

    }
}
