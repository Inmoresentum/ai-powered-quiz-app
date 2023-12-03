package com.example.application.service.stripe;

import com.example.application.security.AuthenticatedUser;
import com.stripe.exception.StripeException;
import com.stripe.model.*;
import com.stripe.model.checkout.Session;
import com.stripe.param.PlanCreateParams;
import com.stripe.param.PriceCreateParams;
import com.stripe.param.ProductCreateParams;
import com.stripe.param.checkout.SessionCreateParams;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class StripePaymentService {
    private final AuthenticatedUser authenticatedUser;

    public String createACheckOutSession(String stripePriceKey) throws StripeException {
//        var mayBeUser = authenticatedUser.get();
//        if (mayBeUser.isEmpty()) throw new IllegalStateException("User is empty");

        Customer customer = StripeCustomerService.findOrCreateCustomer("gg@gg.com", "gg");

        SessionCreateParams params =
                SessionCreateParams.builder()
                        .addLineItem(
                                SessionCreateParams.LineItem.builder()
                                        .setPrice(stripePriceKey)
                                        .setQuantity(1L)
                                        .build())
                        .setCustomerEmail(customer.getEmail())
                        .setMode(SessionCreateParams.Mode.SUBSCRIPTION)
                        .setSuccessUrl("http://localhost:8080/aklsdjfksaldfj")
                        .setCancelUrl("http://localhost:8080/aklsdjfksaldfj/kajsdfkdsj")
                        .build();
        Session session = Session.create(params);
        return session.getUrl();

    }

    public void cancelSubscription(String subscriptionId) throws StripeException {
        Subscription subscription = Subscription.retrieve(subscriptionId);
        subscription.cancel();
    }
}
