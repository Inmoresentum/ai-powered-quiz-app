import React from "react";
import {motion, useMotionTemplate, useMotionValue} from "framer-motion";
import {CheckCheck} from "lucide-react";
import {useNavigate} from "react-router-dom";
import PricingPlan from "@/generated/com/example/application/entities/paidplan/PricingPlan";
import PricingPlanTitle from "@/generated/com/example/application/entities/user/PricingPlanTitle";
import {useAuth} from "@/util/auth";
import {PricingPlanEndpoint} from "@/generated/endpoints";


type TPricingPlan = { plan: PricingPlan };
export default function PricingCard({plan}: TPricingPlan) {
    const navigator = useNavigate();
    const {state} = useAuth();
    let mouseX = useMotionValue(0);
    let mouseY = useMotionValue(0);

    function handleMouseMove({
                                 currentTarget,
                                 clientX,
                                 clientY,
                             }: React.MouseEvent) {
        let {left, top} = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <div key={plan.title}
             className="border-slate-200 shadow-lg p-8 bg-white ring-gray-200 ring-1 ring-offset-2 rounded-3xl relative flex flex-col group"
             onMouseMove={handleMouseMove}
        >
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
        radial-gradient(
          330px circle at ${mouseX}px ${mouseY}px,
          rgba(14, 165, 239, 0.35),
          transparent 80%
        )
      `,
                }}
            />
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
                {plan.features?.map(feature => (
                    <li key={feature} className="text-sm text-slate-700 leading-6 flex">
                        <CheckCheck className="h-5 w-5 text-cyan-500 shrink-0"/>
                        <span className="ml-3">
                                        {feature}
                                </span>
                    </li>
                ))}
            </ul>
            {/*action stuff*/}
            <button
                onClick={async () => {
                    if (!state.loading && !state.user) navigator("/login");
                    if (state.user && plan.title == PricingPlanTitle.FREE) alert("You are already subscribed to Free plan");
                    const url = await PricingPlanEndpoint.generateSubscriptionUrl(plan.title!!)
                    if (url !== "") window.location.href = url;
                }}
                className={`mt-8 block rounded-full px-6 py-4 text-center text-sm font-semibold leading-4  no-underline ${plan.mostPopular ? "bg-cyan-500 hover:bg-cyan-600 text-white" : "bg-cyan-50 hover:bg-cyan-200 text-cyan-400 hover:text-slate-700"}`}>
                {plan.title === PricingPlanTitle.FREE ? "Create An Account" : "Subscribe Now"}
            </button>
        </div>
    );
}