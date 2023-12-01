import React from "react";
import PricingCard from "@/components/landingpage/pricingCard";
import {useQuery} from "react-query";
import {PricingPlanEndpoint} from "@/generated/endpoints";
import ScreenWideLoadingSpinner from "@/components/screenWideLoadingSpinner";

export default function PricingPlan() {
    const {data, isLoading, isError, error} = useQuery({
        queryKey: ["pricing_plan"],
        queryFn: PricingPlanEndpoint.getAllPricingPlan
    })
    if (isLoading) {
        console.log("its still loading");
        return <ScreenWideLoadingSpinner/>
    }
    if (isError) {
        console.log(error);
        return <div>Internal Error Occurred</div>
    }
    console.log("data " + data);
    return (
        <div className="relative">
            <div className="absolute inset-0 flex flex-col">
                <div
                    className="flex-grow wavy-pricing-section  bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-rose-400 to-orange-300"></div>
                <div
                    className="flex-grow wavy-pricing-section bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-700 via-orange-300 to-rose-800"></div>
            </div>
            <div className="grid lg:grid-cols-3 mx-auto max-w-7xl gap-8 py-24 px-4 sm:px-6 lg:px-8 relative">
                {data?.map(plan => (
                    <PricingCard key={plan.title} plan={plan}/>
                ))}
            </div>
        </div>
    );
}