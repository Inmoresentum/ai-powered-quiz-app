import {useForm, useFormPart} from "@hilla/react-form"
import AccountRegistrationRequestBodyModel
    from "@/generated/com/example/application/requestbody/AccountRegistrationRequestBodyModel";
import {TextField} from "@hilla/react-components/TextField.js";
import {EmailField} from "@hilla/react-components/EmailField";
import {DatePicker} from "@hilla/react-components/DatePicker";
import {PasswordField} from "@hilla/react-components/PasswordField";
import React, {useEffect} from "react";
import AccountRegistrationRequestBody
    from "@/generated/com/example/application/requestbody/AccountRegistrationRequestBody";
import {TextArea} from "@hilla/react-components/TextArea";
import {Button} from "@/components/ui/button";
import {UserEndpoint} from "@/generated/endpoints";
import Gender from "@/generated/com/example/application/entities/user/Gender";
import {Select} from "@hilla/react-components/Select";

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
    // use effect to make it run only once
    useEffect(() => {
        usernameField.addValidator({
            message: "This username is already taken",
            validate: async (username: string) => {
                console.log(username);
                const result = await UserEndpoint.userExistsByUsername(username);
                console.log(result);
                return !result;
            },
        });
    }, []);
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
                        style={{'--vaadin-input-field-border-radius': '10px'} as React.CSSProperties} {...field(model.dateOfBirth)}/>

            <PasswordField className="w-full px-6 py-4 m-2"
                           label="Enter a Password"
                           placeholder="Please enter a strong and complicated password"
                           clearButtonVisible={true}
                           {...field(model.password)}/>

            <PasswordField className="w-full px-6 py-4" label="Confirm Password"
                           clearButtonVisible={true}
                           placeholder="Enter your password again"
                           {...field(model.confirmPassword)}/>
            <Select label="Choose your gender" items={items}{...field(model.gender)}/>
            <Button onClick={submit}>Submit</Button>
        </>
    );
}