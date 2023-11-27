import Hero from "@/components/landingpage/hero";
import {Helmet} from "react-helmet-async";

export default function HomePage() {
    return (
        <>
                <Helmet>
                    <title>
                        Home
                    </title>
                    <meta name="description" content="Welcome to QuizBotIQ"/>
                </Helmet>
                <div
                    className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-rose-100 to-teal-100 rounded-full md:rounded-t-full md:rounded-b-[1480px] md:mr-40 md:ml-40 backdrop-blur">
                    <Hero/>
                </div>
        </>
    );
}
