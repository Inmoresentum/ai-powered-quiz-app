import {useQuery} from "react-query";
import ScreenWideLoadingSpinner from "@/components/screenWideLoadingSpinner";
import VerificationMessageDisplay from "@/components/auth/VerificationMessageDisplay";
import Accordion from "@/components/faqs";
import {FAQEndpoint} from "@/generated/endpoints";

export default function AllFaqs() {
    // Queries
    const query = useQuery('faqs', FAQEndpoint.findAllFAQs)
    if (query.isLoading) {
        return <ScreenWideLoadingSpinner/>
    }
    if (query.isError) {
        return <VerificationMessageDisplay message={"Something went wrong"} isError={true}/>
    }
    return (
        <Accordion faqs={query.data!!} showSupportButton={true}/>
    );
}