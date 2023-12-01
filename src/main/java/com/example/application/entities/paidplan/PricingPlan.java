package com.example.application.entities.paidplan;


import com.example.application.entities.user.PricingPlanTitle;
import jakarta.persistence.*;

import java.util.List;

@Entity
public class PricingPlan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Enumerated(EnumType.STRING)
    @Column(unique = true, nullable = false)
    private PricingPlanTitle title;
    // Todo: Add a currency field for the currency and a price field for the price

    // It is a good idea to replace it with a builtin currency or 3rd party library,
    // but it will do for now
    @Column(nullable = false)
    private String currency;

    @Column(nullable = false)
    private Double price;

    private String frequency;
    private String description;
    @Enumerated(EnumType.STRING)
    @ElementCollection(fetch = FetchType.EAGER)
    List<String> features;
    private boolean mostPopular;
}

