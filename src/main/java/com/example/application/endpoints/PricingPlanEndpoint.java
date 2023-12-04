package com.example.application.endpoints;

import com.example.application.entities.paidplan.PricingPlan;
import com.example.application.entities.user.PricingPlanTitle;
import com.example.application.service.pricingplan.PricingPlanService;
import com.example.application.service.stripe.StripePaymentService;
import com.stripe.exception.StripeException;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.Endpoint;
import jakarta.annotation.security.PermitAll;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Endpoint
@RequiredArgsConstructor
public class PricingPlanEndpoint {
    private final PricingPlanService pricingPlanService;

    @AnonymousAllowed
    public List<PricingPlan> getAllPricingPlan() {
        return pricingPlanService.findAllPricingPlan();
    }

    @PermitAll
    public String generateSubscriptionUrl(PricingPlanTitle pricingPlanTitle) throws StripeException {
        if (pricingPlanTitle == PricingPlanTitle.FREE)
            return "";
        return pricingPlanService.generatePricingPlanSubscriptionChargeUlr(pricingPlanTitle);
    }
}
