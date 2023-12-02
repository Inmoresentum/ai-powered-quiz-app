package com.example.application.service.stripe;

import com.example.application.security.AuthenticatedUser;
import com.stripe.exception.StripeException;
import com.stripe.model.*;
import com.stripe.param.PlanCreateParams;
import com.stripe.param.PriceCreateParams;
import com.stripe.param.ProductCreateParams;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class StripePaymentService {
    private final AuthenticatedUser authenticatedUser;

    public String createACheckOutSession() throws StripeException {
//        var mayBeUser = authenticatedUser.get();
//        if (mayBeUser.isEmpty()) throw new IllegalStateException("User is empty");
        // Start by finding an existing customer record from Stripe or creating a new one if needed
        Customer customer = StripeCustomerService.findOrCreateCustomer("gg@gg.com", "gg");

        // Return the checkout session URL
        return "";

    }

    private Product getProductIfExists(String productName) {
        Map<String, Object> productParams = new HashMap<>();
        productParams.put("limit", 3);

        try {
            Iterable<Product> products = Product.list(productParams).autoPagingIterable();
            for (Product product : products) {
                if (productName.equals(product.getName())) {
                    return product;
                }
            }
        } catch (StripeException e) {
            e.printStackTrace();
        }

        return null;
    }

    private void createPlanIfNotExists(String productId, long amount, String planId) {
        Plan plan = getPlanIfExists(planId);
        if (plan == null) {
            PlanCreateParams planParams = PlanCreateParams.builder()
                    .setAmount(amount)
                    .setCurrency("usd")
                    .setInterval(PlanCreateParams.Interval.MONTH)
                    .setProduct(productId)
                    .setId(planId)
                    .build();

            try {
                Plan.create(planParams);
            } catch (StripeException e) {
                e.printStackTrace();
            }
        }
    }

    private Plan getPlanIfExists(String planId) {
        try {
            return Plan.retrieve(planId);
        } catch (StripeException e) {
            if ("resource_missing".equals(e.getCode())) {
                // Plan not found, it's OK to create a new one
                return null;
            }
            e.printStackTrace();
        }

        return null;
    }

    public void cancelSubscription(String subscriptionId) throws StripeException {
        Subscription subscription = Subscription.retrieve(subscriptionId);
        subscription.cancel();
    }
}
