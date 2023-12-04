package com.example.application.repositories;

import com.example.application.entities.paidplan.PricingPlan;
import com.example.application.entities.user.PricingPlanTitle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PricingPlanRepository extends JpaRepository<PricingPlan, Long> {
    Optional<PricingPlan> findPricingPlanByTitle(PricingPlanTitle pricingPlanTitle);
}
