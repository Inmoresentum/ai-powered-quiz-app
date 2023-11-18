import router from 'Frontend/routes.js';
import {AuthProvider} from 'Frontend/util/auth.js';
import {RouterProvider} from 'react-router-dom';
import {HelmetProvider} from "react-helmet-async"
import "./App.css"

const helmetContext = {};

export default function App() {

    return (
        <HelmetProvider context={helmetContext}>
            <AuthProvider>
                <RouterProvider router={router}/>
            </AuthProvider>
        </HelmetProvider>
    );
}
