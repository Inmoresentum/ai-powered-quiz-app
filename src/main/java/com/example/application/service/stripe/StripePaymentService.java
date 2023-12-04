package com.example.application.service.stripe;

import com.example.application.security.AuthenticatedUser;
import com.stripe.exception.StripeException;
import com.stripe.model.*;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StripePaymentService {
    private final AuthenticatedUser authenticatedUser;

    public String createACheckOutSession(String stripePriceKey) throws StripeException {
        var mayBeUser = authenticatedUser.get();
        if (mayBeUser.isEmpty()) throw new IllegalStateException("User is empty");

        Customer customer = StripeCustomerService.findOrCreateCustomer(mayBeUser.get().getEmail(), mayBeUser.get().getUsername());

        SessionCreateParams params =
                SessionCreateParams.builder()
                        .addLineItem(
                                SessionCreateParams.LineItem.builder()
                                        .setPrice(stripePriceKey)
                                        .setQuantity(1L)
                                        .build())
                        .setCustomerEmail(customer.getEmail())
                        .setMode(SessionCreateParams.Mode.SUBSCRIPTION)
                        .setSuccessUrl("http://localhost:8080/payment/success")
                        .setCancelUrl("http://localhost:8080/payment/failure")
                        .build();
        Session session = Session.create(params);
        return session.getUrl();
    }

    public void cancelSubscription(String subscriptionId) throws StripeException {
        Subscription subscription = Subscription.retrieve(subscriptionId);
        subscription.cancel();
    }
}
