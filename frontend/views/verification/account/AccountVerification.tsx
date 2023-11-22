import {Link, useSearchParams} from "react-router-dom";
import {Helmet} from "react-helmet-async";
import {UserEndpoint} from "@/generated/endpoints";
import {useMutation} from "react-query";
import {EndpointError} from "@hilla/frontend";
import {useEffect} from "react";

export default function AccountVerification() {
    const [searchParams] = useSearchParams();
    const verificationToken = searchParams.get("token");
    const mutation = useMutation(UserEndpoint.verifyUserAccount, {
        onSuccess: () => {
            console.log("Yay Account verification is successful");
        },
        onError: () => {
            console.log("I guess the token was invalid")
        },
        retry: false,
    })

    console.log("verificationToken " + verificationToken)
    useEffect(() => {
        if (verificationToken)
            mutation.mutate(verificationToken!!)
    }, []);
    if (!verificationToken) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <Helmet>
                    <title>Account Verification</title>
                    <meta name="description"
                          content="Here the users can verify their account after login"/>
                </Helmet>
                <div className="bg-gray-50 m-2 text-rose-500 rounded-full text-4xl p-3">
                    <div className="regular-64 text-red-500 uppercase underline">
                        This is an invalid link! The Token is missing!!
                    </div>
                </div>
            </div>
        );
    } else {
        if (mutation.isLoading) return <div>Loading</div>
        if (mutation.isSuccess) {
            return (
                <div className="flex flex-col items-center justify-center h-screen">
                    <Helmet>
                        <title>Account Verification</title>
                        <meta name="description"
                              content="Here the users can verify their account after login"/>
                    </Helmet>
                    <div className="bg-gray-50 m-2 text-rose-500 rounded-full text-4xl p-3">
                        <div className="regular-64 text-green-500 uppercase">
                            account verification is successful! {" "} <Link to="/login">Login</Link>
                        </div>
                    </div>
                </div>
            );
        }
        if (mutation.isError && mutation.error instanceof EndpointError) {
            const errorMessage = (mutation.error as EndpointError).message;
            return (
                <div className="flex flex-col items-center justify-center h-screen">
                    <Helmet>
                        <title>Account Verification</title>
                        <meta name="description"
                              content="Here the users can verify their account after login"/>
                    </Helmet>
                    <div className="bg-gray-50 m-2 text-rose-500 rounded-full text-4xl p-3">
                        <div className="regular-64 text-red-500 uppercase">
                            {errorMessage}
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <Helmet>
                    <title>Account Verification</title>
                    <meta name="description"
                          content="Here the users can verify their account after login"/>
                </Helmet>
                <div className="bg-gray-50 m-2 text-rose-500 rounded-full text-4xl p-3">
                    <div className="regular-64 text-red-500 uppercase">
                        Something went wrong
                    </div>
                </div>
            </div>
        );
    }
}