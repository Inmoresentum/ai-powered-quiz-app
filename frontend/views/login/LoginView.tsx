import {LoginI18n, LoginOverlay, LoginOverlayElement} from '@hilla/react-components/LoginOverlay.js';
import {useAuth} from 'Frontend/util/auth.js';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Button} from "@/components/ui/button";
import {TextField} from "@hilla/react-components/TextField.js";
import {PasswordField} from "@hilla/react-components/PasswordField";

const loginI18n: LoginI18n = {
    ...new LoginOverlayElement().i18n,
    header: {title: 'Hilla Auth Starter', description: 'Login using user/user or admin/admin'},
};

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
                    const {error, errorMessage, errorTitle} = await login(username, password);
                    console.log(error)
                    console.log(errorTitle)
                    console.log(errorMessage)
                    if (!error) {
                        navigate("/")
                    }
                }}>Login</Button>
            </div>
        </>
    );
}
