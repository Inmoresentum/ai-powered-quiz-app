import {useSearchParams} from "react-router-dom";
import {Helmet} from "react-helmet-async";

export default function AccountVerification() {
    const [searchParams] = useSearchParams();
    const verificationToken = searchParams.get("token");
    return (
        <div className="flex flex-col items-center justify-center">
            <Helmet>
                <title>Account Verification</title>
                <meta name="description"
                      content="Here the users can verify their account after login"/>
            </Helmet>
            <h1 className="text-center text-3xl text-rose-500">Okay I am in the account  verification page</h1>
            <div className="bg-gray-50 m-2 text-rose-500 rounded-full text-4xl p-3">
                {verificationToken}
            </div>
        </div>
    );
}