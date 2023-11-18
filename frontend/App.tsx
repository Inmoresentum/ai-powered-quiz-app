import router from 'Frontend/routes.js';
import {AuthProvider} from 'Frontend/util/auth.js';
import {RouterProvider} from 'react-router-dom';
import {HelmetProvider} from "react-helmet-async"
import "./App.css"
import {QueryClient, QueryClientProvider} from "react-query";

const helmetContext = {};
const queryClient = new QueryClient()
export default function App() {

    return (
        <QueryClientProvider client={queryClient}>
            <HelmetProvider context={helmetContext}>
                <AuthProvider>
                    <RouterProvider router={router}/>
                </AuthProvider>
            </HelmetProvider>
        </QueryClientProvider>
    );
}
