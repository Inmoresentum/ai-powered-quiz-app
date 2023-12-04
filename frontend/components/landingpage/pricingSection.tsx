import PricingPlan from "@/components/landingpage/pricingPlan";

export default function PricingSection() {
    return (
        <>
            <div id="pricing-section" className="bg-gray-100 wavy-pricing-section shadow-xl">
                <div className="mx-auto max-w-7xl px-4 pt-24 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-extrabold text-black sm:text-5xl sm:leading-tight sm:tracking-tight">
                        Pricing Plans for everyone
                    </h2>
                    <p className="mt-4 max-w-3xl text-lg text-slate-500">
                        Choose an affordable plan meets your needs.
                    </p>
                </div>
                <PricingPlan/>
            </div>
        </>
    );
}