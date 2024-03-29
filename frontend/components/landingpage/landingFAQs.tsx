import {FAQEndpoint} from "@/generated/endpoints";
import {useQuery} from "react-query";
import ScreenWideLoadingSpinner from "@/components/screenWideLoadingSpinner";
import VerificationMessageDisplay from "@/components/auth/VerificationMessageDisplay";
import Accordion from "@/components/faqs";

export default function LandingPageFAQ() {
    // Queries
    const query = useQuery('faqs', FAQEndpoint.findFirstTenFAQs)
    if (query.isLoading) {
        return <ScreenWideLoadingSpinner/>
    }
    if (query.isError) {
        return <VerificationMessageDisplay message={"Something went wrong"} isError={true}/>
    }
    return (
        <>
            <Accordion faqs={query.data!!} showSupportButton={false}/>
        </>
    );

}