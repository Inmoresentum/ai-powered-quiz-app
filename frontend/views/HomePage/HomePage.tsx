import Hero from "@/components/landingpage/hero";

export default function HomePage() {
    return (
        <>
                <div
                    className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-rose-100 to-teal-100 rounded-full md:rounded-t-full md:rounded-b-[1480px] md:mr-40 md:ml-40 backdrop-blur">
                    <Hero/>
                </div>
        </>
    );
}
