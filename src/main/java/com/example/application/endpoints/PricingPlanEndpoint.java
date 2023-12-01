package com.example.application.endpoints;

import com.example.application.entities.paidplan.PricingPlan;
import com.example.application.service.pricingplan.PricingPlanService;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.Endpoint;
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
}
