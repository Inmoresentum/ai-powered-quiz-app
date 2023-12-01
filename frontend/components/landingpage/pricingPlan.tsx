import {MockPricingPlanData} from "./mockPricingPlanData"
import {CheckCheck} from "lucide-react";
import {Link} from "react-router-dom";

export default function PricingPlan() {
    return (

        <div className="relative">
            <div className="absolute inset-0 flex flex-col">
                <div className="flex-grow wavy-pricing-section  bg-gradient-to-r from-cyan-200 to-cyan-400"></div>
                <div
                    className="flex-grow wavy-pricing-section bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-700 via-orange-300 to-rose-800"></div>
            </div>
            <div className="grid lg:grid-cols-3 mx-auto max-w-7xl gap-8 py-24 px-4 sm:px-6 lg:px-8">
                {MockPricingPlanData.map(plan => (
                    <div key={plan.title}
                         className="border-slate-200 shadow-lg p-8 bg-white ring-gray-200 ring-1 ring-offset-2 rounded-3xl relative flex flex-col">
                        <h3 className="text-lg font-semibold leading-5">
                            {plan.title}
                        </h3>
                        {plan.mostPopular && (
                            <p className="absolute top-0 -translate-y-1/2 rounded-full bg-cyan-500 px-3 py-0.5 text-sm font-semibold tracking-wide text-white shadow-lg">
                                Most Popular
                            </p>
                        )}
                        <p className="mt-4 text-sm text-slate-700 leading-6">
                            {plan.description}
                        </p>
                        <div className="-mx-6 mt-4 rounded-lg bg-slate-100 p-6">
                            <p className="flex items-center text-sm font-semibold text-slate-500">
                                <span>{plan.currency}</span>
                                <span className="ml-3 text-4xl text-slate-900">${plan.price}</span>
                                <span className="ml-1.5">{plan.frequency}</span>
                            </p>
                        </div>
                        {/*features*/}
                        <ul className="mt-6 space-y-4 flex-grow">
                            {plan.features.map(feature => (
                                <li key={feature} className="text-sm text-slate-700 leading-6 flex">
                                    <CheckCheck className="h-5 w-5 text-cyan-500 shrink-0"/>
                                    <span className="ml-3">
                                        {feature}
                                </span>
                                </li>
                            ))}
                        </ul>
                        {/*action stuff*/}
                        <Link to="#"
                              className={`mt-8 block rounded-full px-6 py-4 text-center text-sm font-semibold leading-4  no-underline ${plan.mostPopular ? "bg-cyan-500 hover:bg-cyan-600 text-white" : "bg-cyan-50 hover:bg-cyan-200 text-cyan-400 hover:text-slate-700"}`}>
                            {plan.cta}
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}