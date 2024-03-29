import {useForm, useFormPart} from "@hilla/react-form"
import AccountRegistrationRequestBodyModel
    from "@/generated/com/example/application/requestbody/AccountRegistrationRequestBodyModel";
import {TextField} from "@hilla/react-components/TextField.js";
import {EmailField} from "@hilla/react-components/EmailField";
import {DatePicker} from "@hilla/react-components/DatePicker";
import {PasswordField} from "@hilla/react-components/PasswordField";
import React, {useEffect, useRef, useState} from "react";
import AccountRegistrationRequestBody
    from "@/generated/com/example/application/requestbody/AccountRegistrationRequestBody";
import {TextArea} from "@hilla/react-components/TextArea";
import {Button} from "@/components/ui/button";
import {UserEndpoint} from "@/generated/endpoints";
import Gender from "@/generated/com/example/application/entities/user/Gender";
import {ComboBox} from "@hilla/react-components/ComboBox";
import {NavLink} from "react-router-dom";
import {UploadUserImage} from "@/custom-apis-service/FileStorageApis"
import {Loader2} from "lucide-react";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {Separator} from "@/components/ui/separator";

type AccountRegistrationFormProps = {
    onSuccessfulFormSubmit: () => void;
};
export default function AccountRegistrationForm({onSuccessfulFormSubmit}: AccountRegistrationFormProps) {
    const [isFormSubmitting, setIsFormSubmitting] = useState<boolean>(false);
    const {model, field, addValidator, submit, clear, dirty} = useForm(AccountRegistrationRequestBodyModel, {
        onSubmit: async (accountRegistrationBody) => {
            if (profileImage) {
                console.log("I have an image and I am trying to upload it to the server");
                setIsFormSubmitting(true);
                accountRegistrationBody.profilePictureUlr = await UploadUserImage(profileImage);
                console.log(accountRegistrationBody.profilePictureUlr);
                console.log("I am kinda done....");
            }
            console.log("Now I am tyring to account registration request body");
            console.log(accountRegistrationBody);
            await UserEndpoint.registerUser(accountRegistrationBody);
            setIsFormSubmitting(false);
            onSuccessfulFormSubmit();
        }
    });

    useEffect(() => {
        addValidator({
            message: 'Please check that the password is repeated correctly',
            validate: (value: AccountRegistrationRequestBody) => {
                if (value.password != value.confirmPassword) {
                    return [{property: model.confirmPassword}];
                }
                return [];
            }
        });
    }, []);

    const usernameField = useFormPart(model.username);
    useEffect(() => {
        usernameField.addValidator({
            message: "This username is already taken",
            validate: async (username: string) => {
                console.log(username);
                return !await (UserEndpoint.userExistsByUsername(username));
            },
        });
    }, []);

    const emailField = useFormPart(model.email);
    useEffect(() => {
        emailField.addValidator({
            message: "This email is already in use",
            validate: async (email: string) => {
                console.log(email);
                return !await UserEndpoint.userExistsByEmail(email);
            },
        });
    }, []);

    const [profileImagePreview, setProfileImagePreview] = useState<null | string>()
    const [profileImage, setProfileImage] = useState<File>()
    const imageInputField = useRef<HTMLInputElement | null>(null);
    useEffect(() => {
        return () => {
            if (profileImagePreview) {
                URL.revokeObjectURL(profileImagePreview);
            }
        };
    }, [profileImagePreview]);

    const items = [
        {
            label: "Male",
            value: Gender.MALE,
        },
        {
            label: "Female",
            value: Gender.FEMALE
        },
        {
            label: "Other",
            value: Gender.OTHER
        }
    ];

    return (
        <>
            <TextField className="w-full px-6 py-4 md:hover:-translate-y-2 duration-300 ease-linear"
                       label="Username" placeholder="Enter a username that you like"
                       {...field(model.username)}
                       clearButtonVisible={true}
                       style={{'--vaadin-input-field-border-radius': '20px'} as React.CSSProperties}
            >
            </TextField>

            <TextField className="w-full px-6 py-4 md:hover:-translate-y-2 duration-300 ease-linear" label="Full Name"
                       placeholder="Enter your full name"
                       clearButtonVisible={true}
                       style={{'--vaadin-input-field-border-radius': '20px'} as React.CSSProperties}
                       {...field(model.name)}>

            </TextField>

            <TextField className="w-full px-6 py-4 md:hover:-translate-y-2 duration-300 ease-linear"
                       label="Phone Number"
                       placeholder="Enter your Phone Number"
                       clearButtonVisible={true}
                       style={{'--vaadin-input-field-border-radius': '20px'} as React.CSSProperties}
                       helperText="It's optional"
                       allowedCharPattern="[0-9()+-]"
                       {...field(model.phoneNumber)}>

            </TextField>

            <TextArea className="w-full px-6 py-4 md:hover:-translate-y-2 duration-300 ease-linear" label="Address"
                      placeholder="Please enter your Address"
                      clearButtonVisible={true}
                      style={{'--vaadin-input-field-border-radius': '20px'} as React.CSSProperties}
                      {...field(model.address)}>

            </TextArea>

            <EmailField className="w-full px-6 py-4 md:hover:-translate-y-2 duration-300 ease-linear" label="Email"
                        placeholder="Please enter your email address"
                        clearButtonVisible={true}
                        style={{'--vaadin-input-field-border-radius': '20px'} as React.CSSProperties}
                        {...field(model.email)}>

            </EmailField>

            <DatePicker className="w-full px-6 py-4 md:hover:-translate-y-2 duration-300 ease-linear"
                        label="Date Of Birth" placeholder="Enter your date of birth"
                        clearButtonVisible={true}
                        {...field(model.dateOfBirth)}
                        style={{'--vaadin-input-field-border-radius': '10px'} as React.CSSProperties}/>

            <PasswordField className="w-full px-6 py-4 md:hover:-translate-y-2 duration-300 ease-linear"
                           label="Enter a Password"
                           placeholder="Please enter a strong and complicated password"
                           clearButtonVisible={true}
                           style={{'--vaadin-input-field-border-radius': '20px'} as React.CSSProperties}
                           {...field(model.password)}/>

            <PasswordField className="w-full px-6 py-4 md:hover:-translate-y-2 duration-300 ease-linear"
                           label="Confirm Password"
                           clearButtonVisible={true}
                           placeholder="Enter your password again"
                           style={{'--vaadin-input-field-border-radius': '20px'} as React.CSSProperties}
                           {...field(model.confirmPassword)}/>

            <ComboBox className="w-full px-6 py-4 md:hover:-translate-y-2 duration-300 ease-linear"
                      label="Choose your gender"
                      clearButtonVisible={true}
                      style={{'--vaadin-input-field-border-radius': '20px'} as React.CSSProperties}
                      placeholder="Please choose your gender" items={items} {...field(model.gender)}/>

            <TextArea className="w-full px-6 py-4 md:hover:-translate-y-2 duration-300 ease-linear" label="BIO"
                      placeholder="Tell the world something about yourself"
                      clearButtonVisible={true}
                      style={{'--vaadin-input-field-border-radius': '20px'} as React.CSSProperties}
                      {...field(model.userBio)}>
            </TextArea>

            <div className="w-full px-6 py-4 md:hover:-translate-y-2 duration-300 ease-linear">
                <label
                    className="block text-gray-700 font-medium mb-2"
                    htmlFor="user-profile">
                    Profile Image
                </label>
                <input
                    ref={imageInputField}
                    className="w-full p-2 h-[70px] border border-gray-300 rounded-md bg-gray-10 hover:ring-1"
                    type="file"
                    accept="image/*"
                    id="user-profile"
                    onChange={e => {
                        setProfileImagePreview(null);
                        if (e.target.files) {
                            const file = e.target.files[0];
                            setProfileImage(file);
                            setProfileImagePreview(URL.createObjectURL(file));
                        }
                    }}
                />
                {profileImagePreview && (
                    <>
                        <img src={profileImagePreview}
                             className="w-full h-52 rounded-2xl p-2 hover:scale-105 duration-300 ease-in" alt=""/>
                        <div className="flex items-center justify-center">
                            <Button className="uppercase hover:bg-red-400 duration-300 ease-linear p-2 w-full rounded-full font-mono
                            hover:shadow-xl hover:drop-shadow-xl hover:shadow-red-600 hover:text-black"
                                    onClick={() => {
                                        setProfileImagePreview(null);
                                        setProfileImage(undefined);
                                        if (imageInputField.current !== null) {
                                            imageInputField.current.value = "";
                                        }
                                    }}>
                                clear image
                            </Button>
                        </div>
                    </>
                )}
            </div>


            <div className="flex flex-row w-full justify-end px-3">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild={true}>
                            <Button className="m-4 p-2 font-mono bg-gray-20 font-bold hover:bg-red-500 duration-500
             ease-linear rounded-full hover:-translate-y-1 hover:shadow-xl hover:drop-shadow-xl hover:shadow-red-600 hover:text-black"
                                    onClick={clear}
                                    disabled={!dirty}
                                    variant="secondary"
                            >
                                CLEAR FORM
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p className="text-blue-500 font-medium">Clear the Form</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>

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
            </div>

            <Separator className="my-0.5 bg-teal-400 h-[2px] shadow-xl rounded-full"/>

            <div className="flex justify-between mt-4 mb-8">
                <div className="font-mono text-blue-500 font-bold">Already Have An account?</div>
                <NavLink
                    className="px-2 font-bold font-mono text-amber-500 hover:text-pink-500
                     ease-linear duration-300  underline-offset-0 uppercase hover:-translate-y-0.5"
                    to="/login"> Login </NavLink>
            </div>
        </>
    );
}