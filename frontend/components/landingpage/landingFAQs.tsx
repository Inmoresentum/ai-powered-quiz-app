import {HomePageService} from "@/generated/endpoints";
import {useQuery, useQueryClient} from "react-query";
import ScreenWideLoadingSpinner from "@/components/screenWideLoadingSpinner";
import VerificationMessageDisplay from "@/components/auth/VerificationMessageDisplay";
import Accordion from "@/components/faqs";

export default function LandingPageFAQ() {
    // Queries
    const query = useQuery('faqs', HomePageService.findFirstTenFAQs)
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