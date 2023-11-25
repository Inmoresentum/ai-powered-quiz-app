import {useSearchParams} from "react-router-dom";
import {UserEndpoint} from "@/generated/endpoints";
import {useMutation} from "react-query";
import {EndpointError} from "@hilla/frontend";
import React, {useEffect} from "react";
import VerificationMessageDisplay from "@/components/VerificationMessageDisplay";

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
            <VerificationMessageDisplay message="Verification Token is missing" isError={true}/>
        );
    } else {
        // todo: I  will try to add a nice loading spinner here
        if (mutation.isLoading) {
            return (
                <div className="flex justify-center items-center min-h-screen">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
                </div>
            );
        }

        if (mutation.isSuccess) {
            return (
                <VerificationMessageDisplay message="account verification is successful!" isError={false}/>
            );
        }
        if (mutation.isError && mutation.error instanceof EndpointError) {
            const errorMessage = (mutation.error as EndpointError).message;
            return (
                <VerificationMessageDisplay message={errorMessage} isError={true}/>
            );
        }

        return (
            <VerificationMessageDisplay message="Something went wrong" isError={true}/>
        );
    }
}

