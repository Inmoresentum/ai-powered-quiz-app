package com.example.application.config.stripe;

import com.stripe.Stripe;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;


@Configuration
public class StripeConfig {

    @Value("${STRIPE_SEC_API}")
    private String apiKey;

    @PostConstruct
    public void init() {
        System.out.println(apiKey);
        Stripe.apiKey = this.apiKey;
    }
}