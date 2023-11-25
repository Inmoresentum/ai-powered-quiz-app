import {Link, useSearchParams} from "react-router-dom";
import {Separator} from "@/components/ui/separator";
import React, {useEffect} from "react";
import {Button} from "@/components/ui/button";
import {Loader2} from "lucide-react";
import {useForm} from "@hilla/react-form";
import ResetPasswordVerificationRequestBodyModel
    from "@/generated/com/example/application/requestbody/ResetPasswordVerificationRequestBodyModel";
import {UserEndpoint} from "@/generated/endpoints";
import {PasswordField} from "@hilla/react-components/PasswordField";
import ResetPasswordVerificationRequestBody
    from "@/generated/com/example/application/requestbody/ResetPasswordVerificationRequestBody";
import {useMutation} from "react-query";
import VerificationMessageDisplay from "@/components/VerificationMessageDisplay";
import {EndpointError} from "@hilla/frontend";
import ScreenWideLoadingSpinner from "@/components/screenWideLoadingSpinner";

export default function ForgotPasswordVerificationView() {
    const [searchParams] = useSearchParams();
    const verificationToken = searchParams.get("token");
    const {model, field, addValidator, submit, read} = useForm(ResetPasswordVerificationRequestBodyModel, {
        onSubmit: async (resetPasswordVerificationRequest) => {
            resetPasswordRequestMutation.mutate(resetPasswordVerificationRequest);
        }
    });

    useEffect(() => {
        addValidator({
            message: 'Please check that the password is repeated correctly',
            validate: (value: ResetPasswordVerificationRequestBody) => {
                if (value.newPassword != value.confirmNewPassword) {
                    return [{property: model.confirmNewPassword}];
                }
                return [];
            }
        });
    }, []);

    const verificationTokenMutation = useMutation({
        mutationFn: UserEndpoint.isForgotPasswordVerificationLinkValid,

        onSuccess: () => {
            console.log("The password reset link is valid");
            const defaultValues: ResetPasswordVerificationRequestBody = {
                passwordResetVerificationToken: verificationToken!!,
                confirmNewPassword: "",
                newPassword: ""
            }
            read(defaultValues);
        },

        onError: () => {
            console.log("I guess the token was invalid")
        },
        retry: false,
    });

    const resetPasswordRequestMutation = useMutation({
        mutationFn: UserEndpoint.resetAccountPassword,
        retry: false,
    });


    useEffect(() => {
        if (verificationToken) {
            verificationTokenMutation.mutate(verificationToken!!)
        }
    }, []);

    if (!verificationToken) {
        return (
            <VerificationMessageDisplay message="Password Reset Verification Token is missing" isError={true}/>
        );
    }

    if (verificationTokenMutation.isLoading) {
        return (
            <ScreenWideLoadingSpinner/>
        );
    }
    console.log(verificationTokenMutation.data);
    if (!verificationTokenMutation.data) {
        return (
            <VerificationMessageDisplay message="Link has expired or invalid" isError={true}/>
        );
    }

    if (verificationTokenMutation.isError) {
        return (
            <VerificationMessageDisplay message="Something went wrong" isError={true}/>
        );
    }

    return (
        <div className={`flex items-center justify-center h-screen bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-200 via-gray-400 to-gray-600`}>
            <div
                className={`bg-gray-200 min-w-full rounded-2xl md:min-w-[450px] lg:md:min-w-[550px] flex flex-col shadow-xl items-center justify-center hover:shadow-2xl drop-shadow-2xl duration-300 ease-linear hover:bg-gray-100 md:m-20 ${resetPasswordRequestMutation.isLoading ? "opacity-80" : ""}`}>
                <Link to="/" className="flex flex-row items-center justify-center">
                    <img
                        src="images/ai_quiz_logo.png"
                        alt="icons/icon.png"
                        className="w-[110px] h-[110px] rounded-2xl hover:scale-105 hover:brightness-125 hover:contrast-150 hover:saturate-150 transition-all duration-300 ease-in-out m-2 p-2"
                    />
                </Link>

                <Separator className="my-0.5 bg-pink-400 h-[2px] w-[75%]"/>
                {
                    !resetPasswordRequestMutation.isSuccess ? (
                            <>
                                {!resetPasswordRequestMutation.isError ? (
                                    <>
                                        <h1 className="uppercase text-xl bg-green-500 rounded-full p-2 m-2 text-[24px] font-[550] bg-gradient-to-r from-rose-400 to-red-500 bg-clip-text text-transparent font-serif">
                                            Forgot Password?
                                        </h1>
                                        <Separator className="my-0.5 bg-pink-400 h-[2px] w-[75%]"/>
                                        <div
                                            className="bg-gray-100 p-4 rounded-full shadow w-10/12 m-auto mt-2.5 font-serif">
                                            <h2 className="text-rose-700 text-lg font-semibold text-center">Password Reset
                                                Form</h2>
                                        </div>
                                        <PasswordField label="New Password" placeholder="Please enter a new password"
                                                       {...field(model.newPassword)}
                                                       disabled={resetPasswordRequestMutation.isLoading}
                                                       helperText="Enter your new strong and complicated password"
                                                       className="w-full px-6 py-4 rounded-[20px] hover:ring-2 hover:shadow-xl hover:bg-white md:hover:-translate-y-2 duration-300 ease-linear"
                                                       style={{'--vaadin-input-field-border-radius': '20px'} as React.CSSProperties}
                                                       clearButtonVisible={true}
                                        />

                                        <PasswordField label="Confirm Password"
                                                       placeholder="Please enter your Email Address "
                                                       {...field(model.confirmNewPassword)}
                                                       disabled={resetPasswordRequestMutation.isLoading}
                                                       helperText="Repeat your new strong and complicated password"
                                                       className="w-full px-6 py-4 rounded-[20px] hover:ring-2 hover:shadow-xl hover:bg-white md:hover:-translate-y-2 duration-300 ease-linear"
                                                       style={{'--vaadin-input-field-border-radius': '20px'} as React.CSSProperties}
                                                       clearButtonVisible={true}
                                        />
                                        <Button
                                            className="m-4 font-mono font-bold hover:bg-green-500 duration-500 flex-grow bg-blue-400 shadow-xl ease-linear rounded-full hover:-translate-y-1 hover:shadow-xl hover:drop-shadow-xl hover:shadow-green-600 hover:text-black"
                                            onClick={submit}
                                            disabled={resetPasswordRequestMutation.isLoading}
                                        >{resetPasswordRequestMutation.isLoading ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                                                Please wait
                                            </>
                                        ) : "Submit"}
                                        </Button>
                                    </>) : (
                                    <div
                                        className="m-4 font-semibold font-sans text-xl bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">
                                        {(resetPasswordRequestMutation.error as EndpointError).message}
                                    </div>
                                )}
                            </>
                        )
                        :
                        (
                            <div
                                className="m-4 font-semibold font-sans text-xl bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">
                                You have successfully Recovered Your Account. <Link to="/login"
                                                                                    className="text-red-500 underline">Login</Link>
                            </div>
                        )
                }
            </div>
        </div>
    );
}