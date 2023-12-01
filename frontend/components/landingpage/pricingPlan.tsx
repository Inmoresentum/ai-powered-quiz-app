import {MockPricingPlanData} from "./mockPricingPlanData"
import React from "react";
import PricingCard from "@/components/landingpage/pricingCard";

export default function PricingPlan() {
    return (
        <div className="relative">
            <div className="absolute inset-0 flex flex-col">
                <div
                    className="flex-grow wavy-pricing-section  bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-rose-400 to-orange-300"></div>
                <div
                    className="flex-grow wavy-pricing-section bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-700 via-orange-300 to-rose-800"></div>
            </div>
            <div className="grid lg:grid-cols-3 mx-auto max-w-7xl gap-8 py-24 px-4 sm:px-6 lg:px-8 relative">
                {MockPricingPlanData.map(plan => (
                    <PricingCard key={plan.title} plan={plan}/>
                ))}
            </div>
        </div>
    );
}