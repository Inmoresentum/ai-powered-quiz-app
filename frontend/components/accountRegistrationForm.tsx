import {useForm, useFormPart} from "@hilla/react-form"
import AccountRegistrationRequestBodyModel
    from "@/generated/com/example/application/requestbody/AccountRegistrationRequestBodyModel";
import {TextField} from "@hilla/react-components/TextField.js";
import {EmailField} from "@hilla/react-components/EmailField";
import {DatePicker} from "@hilla/react-components/DatePicker";
import {PasswordField} from "@hilla/react-components/PasswordField";
import React, {useEffect, useState} from "react";
import AccountRegistrationRequestBody
    from "@/generated/com/example/application/requestbody/AccountRegistrationRequestBody";
import {TextArea} from "@hilla/react-components/TextArea";
import {Button} from "@/components/ui/button";
import {UserEndpoint} from "@/generated/endpoints";
import Gender from "@/generated/com/example/application/entities/user/Gender";
import {ComboBox} from "@hilla/react-components/ComboBox";

export default function AccountRegistrationForm() {
    const {model, field, addValidator, submit} = useForm(AccountRegistrationRequestBodyModel, {
        onSubmit: async (e) => {
            console.log(e);
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

    const [profileImage, setProfileImage] = useState<any>()

    useEffect(() => {
        return () => {
            if (profileImage) {
                URL.revokeObjectURL(profileImage);
            }
        };
    }, [profileImage]);

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
            <TextField className="w-full px-6 py-4" label="Username" placeholder="Enter a username that you like"
                       {...field(model.username)}>

            </TextField>

            <TextField className="w-full px-6 py-4" label="Full Name" placeholder="Enter your full name"
                       {...field(model.name)}>

            </TextField>

            <TextArea className="w-full px-6 py-4" label="Address" placeholder="Please enter your Address"
                      {...field(model.address)}>

            </TextArea>

            <EmailField className="w-full px-6 py-4" label="Email" placeholder="Please enter your email address"
                        {...field(model.email)}>

            </EmailField>

            <DatePicker className="w-full px-6 py-4" label="Date Of Birth" placeholder="Enter your date of birth"
                        {...field(model.dateOfBirth)}
                        style={{'--vaadin-input-field-border-radius': '10px'} as React.CSSProperties}/>

            <PasswordField className="w-full px-6 py-4 m-2"
                           label="Enter a Password"
                           placeholder="Please enter a strong and complicated password"
                           clearButtonVisible={true}
                           {...field(model.password)}/>

            <PasswordField className="w-full px-6 py-4" label="Confirm Password"
                           clearButtonVisible={true}
                           placeholder="Enter your password again"
                           {...field(model.confirmPassword)}/>

            <ComboBox className="w-full px-6 py-4" label="Choose your gender"
                      placeholder="Please choose your gender" items={items} {...field(model.gender)}/>

            <TextArea className="w-full px-6 py-4" label="BIO" placeholder="Tell the world something about yourself"
                      {...field(model.userBio)}>
            </TextArea>

            <div className="w-full px-6 py-4">
                <label
                    className="block text-gray-700 font-medium mb-2"
                    htmlFor="user-profile"
                >
                    Profile Image
                </label>
                <input
                    className="w-full p-2 border border-gray-300 rounded-md"
                    type="file"
                    accept="image/*"
                    id="user-profile"
                    onChange={e => {
                        setProfileImage(null);
                        if (e.target.files) {
                            const file = e.target.files[0];
                            setProfileImage(URL.createObjectURL(file));
                        }
                    }}
                />
                {profileImage && (
                    <>
                        <img src={profileImage} className="w-full h-52 rounded-2xl p-2"/>
                        <div className="flex items-center justify-center">
                            <Button className="uppercase hover:bg-red-400 duration-300 ease-linear p-2"
                                    onClick={event => {
                                        setProfileImage(null);
                                    }}>
                                clear image
                            </Button>
                        </div>
                    </>
                )}
            </div>

            <Button onClick={submit}>Submit</Button>
        </>
    );
}