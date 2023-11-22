import {protectRoutes} from '@hilla/react-auth';
import HelloWorldView from 'Frontend/views/helloworld/HelloWorldView.js';
import LoginView from 'Frontend/views/login/LoginView.js';
import MainLayout from 'Frontend/views/MainLayout.js';
import {lazy} from 'react';
import {createBrowserRouter, RouteObject} from 'react-router-dom';
import AccountVerification from "@/views/verification/account/AccountVerification";
import RegistrationView from "@/views/registration/RegistrationView";
import NotFoundPage from "@/views/404NotFound/NotFound";

const AboutView = lazy(async () => import('Frontend/views/about/AboutView.js'));

export const routes = protectRoutes([
    {
        element: <MainLayout/>,
        handle: {title: "Main"},
        children: [
            {path: "/", element: <HelloWorldView/>, handle: {title: "QuizBotIQ", requiresLogin: true}},
            {path: '/about', element: <AboutView/>, handle: {title: "About", requiresLogin: true}},
        ],
    },
    {path: "/login", element: <LoginView/>, handle: {title: "Login"}},
    {
        path: "/auth/register",
        element: <RegistrationView/>,
        handle: {title: "Register An Account", requiresLogin: false}
    },
    {
        path: "/auth/verify/account/activate",
        element: <AccountVerification/>,
        handle: {title: "Verify Account", requiresLogin: false}
    },

    {
        path: "*",
        element: <NotFoundPage/>,
        handle: {title: "404 NOT FOUND", requiresLogin: false}
    }
]) as RouteObject[];

export default createBrowserRouter(routes);
