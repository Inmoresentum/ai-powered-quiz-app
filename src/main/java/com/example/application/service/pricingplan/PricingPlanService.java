package com.example.application.service.pricingplan;

import com.example.application.entities.paidplan.PricingPlan;
import com.example.application.repositories.PricingPlanRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PricingPlanService {
    private final PricingPlanRepository pricingPlanRepository;

    public List<PricingPlan> findAllPricingPlan() {
        return pricingPlanRepository.findAll();
    }
}
