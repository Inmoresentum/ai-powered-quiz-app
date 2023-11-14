import {useAuth} from 'Frontend/util/auth.js';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Button} from "@/components/ui/button";
import {TextField} from "@hilla/react-components/TextField.js";
import {PasswordField} from "@hilla/react-components/PasswordField";
import {UserEndpoint} from "@/generated/endpoints";

export default function LoginView() {
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const navigate = useNavigate();
    const {login} = useAuth();

    return (
        <>
            <div className="flex items-center justify-center flex-col w-full h-full">
                <TextField onChange={e => setUsername(e.target.value)} className="w-1/4"/>
                <PasswordField onChange={e => setPassword(e.target.value)} className="w-1/4"/>
                <Button onClick={async event => {
                    console.log("Trying to login " + event.detail)
                    const verified = await UserEndpoint.isNotAccountVerified(username);

                    console.log("Is account not verified " + verified);
                    if (verified) {
                        return;
                    }
                    const {error, errorMessage, errorTitle, token, defaultUrl, redirectUrl} = await login(username, password);
                    console.log(error)
                    console.log(errorTitle)
                    console.log(errorMessage)
                    console.log("token = " + token)
                    console.log("default url = " + defaultUrl)
                    console.log("redirecturl = " + redirectUrl)
                    if (!error) {
                        navigate("/")
                    }
                }}>Login</Button>
            </div>
        </>
    );
}
