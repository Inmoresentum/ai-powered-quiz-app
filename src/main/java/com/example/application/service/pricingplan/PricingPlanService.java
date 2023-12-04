package com.example.application.service.pricingplan;

import com.example.application.entities.paidplan.PricingPlan;
import com.example.application.entities.user.PricingPlanTitle;
import com.example.application.repositories.PricingPlanRepository;
import com.example.application.service.stripe.StripePaymentService;
import com.stripe.exception.StripeException;
import dev.hilla.exception.EndpointException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PricingPlanService {
    private final PricingPlanRepository pricingPlanRepository;
    private final StripePaymentService stripePaymentService;

    public List<PricingPlan> findAllPricingPlan() {
        return pricingPlanRepository.findAll();
    }

    public String generatePricingPlanSubscriptionChargeUlr(PricingPlanTitle pricingPlanTitle) throws StripeException {
        Optional<PricingPlan> pricingPlanByTitle = pricingPlanRepository.findPricingPlanByTitle(pricingPlanTitle);
        if (pricingPlanByTitle.isEmpty()) throw new EndpointException("Server Encountered a Error");
        System.out.println(pricingPlanByTitle.get());
        return stripePaymentService.createACheckOutSession(pricingPlanByTitle.get().getStripePriceKey());
    }
}
