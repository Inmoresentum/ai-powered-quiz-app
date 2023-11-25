import {Link} from "react-router-dom";
import {Separator} from "@/components/ui/separator";
import {EmailField} from "@hilla/react-components/EmailField";
import React, {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import {Loader2} from "lucide-react";
import {useForm, useFormPart} from "@hilla/react-form";
import ResetPasswordRequestBodyModel
    from "@/generated/com/example/application/requestbody/ResetPasswordRequestBodyModel";
import {UserEndpoint} from "@/generated/endpoints";

export default function ForgotPasswordView() {
    const [isFormSubmitting, setIsFormSubmitting] = useState<boolean>(false)
    const [passwordResetRequestSuccessful, setPasswordResetRequestSuccessful] = useState<boolean>(false)
    const {model, field, submit} = useForm(ResetPasswordRequestBodyModel, {
        onSubmit: async (passwordResetRequestBody) => {
            setIsFormSubmitting(true);
            await UserEndpoint.forgotPassword(passwordResetRequestBody);
            setIsFormSubmitting(false);
            setPasswordResetRequestSuccessful(true);
        }
    });

    const emailField = useFormPart(model.email);

    useEffect(() => {
        emailField.addValidator({
            message: "No user exits with this email",
            validate: async (email: string) => {
                console.log(email);
                return await (UserEndpoint.userExistsByEmail(email));
            },
        });
    }, []);

    return (
        <div className={`flex items-center justify-center h-screen`}>
            <div
                className={`bg-gray-200 min-w-full rounded-2xl md:min-w-[450px] lg:md:min-w-[550px] flex flex-col shadow-xl items-center justify-center hover:shadow-2xl drop-shadow-2xl duration-300 ease-linear hover:bg-gray-100 md:m-20 ${isFormSubmitting ? "opacity-80" : ""}`}>
                <Link to="/" className="flex flex-row items-center justify-center">
                    <img
                        src="images/ai_quiz_logo.png"
                        alt="icons/icon.png"
                        className="w-[110px] h-[110px] rounded-2xl hover:scale-105 hover:brightness-125 hover:contrast-150 hover:saturate-150 transition-all duration-300 ease-in-out m-2 p-2"
                    />
                </Link>

                <Separator className="my-0.5 bg-pink-400 h-[2px] w-[75%]"/>
                {
                    !passwordResetRequestSuccessful ? (
                            <>
                                <h1 className="uppercase text-xl bg-green-500 rounded-full p-2 m-2 text-[24px] font-[550] bg-gradient-to-r from-rose-400 to-red-500 bg-clip-text text-transparent font-serif">
                                    Forgot Password?
                                </h1>
                                <Separator className="my-0.5 bg-pink-400 h-[2px] w-[75%]"/>
                                <div className="bg-gray-100 p-6 rounded-lg shadow-lg w-10/12 m-auto mt-2.5 font-serif">
                                    <h2 className="text-gray-700 text-lg font-semibold text-center">Password Reset</h2>
                                    <p className="text-gray-600 text-base text-center mt-4 underline">Worry Not!!</p>
                                    <p className="text-gray-600 text-base text-center">Give us your email and we will send
                                        you the
                                        password reset link.</p>
                                </div>
                                <EmailField label="Email" placeholder="Please enter your Email Address "
                                            {...field(model.email)}
                                            disabled={isFormSubmitting}
                                            helperText="Please enter the email address that you used to register with us"
                                            className="w-full px-6 py-4 md:hover:-translate-y-2 duration-300 ease-linear"
                                            style={{'--vaadin-input-field-border-radius': '20px'} as React.CSSProperties}
                                            clearButtonVisible={true}
                                />
                                <Button className="m-4 font-mono font-bold hover:bg-green-500 duration-500 flex-grow bg-blue-400 shadow-xl
             ease-linear rounded-full hover:-translate-y-1 hover:shadow-xl hover:drop-shadow-xl hover:shadow-green-600 hover:text-black"
                                        onClick={submit}
                                        disabled={isFormSubmitting}
                                >{isFormSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                                        Please wait
                                    </>
                                ) : "Submit"}
                                </Button>
                            </>
                        )
                        :
                        (
                            <div className="m-4 font-semibold font-sans text-xl bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">
                                Please check your <span className="text-red-500 underline">email</span> for further instructions
                            </div>
                        )
                }
            </div>
        </div>
    );
}