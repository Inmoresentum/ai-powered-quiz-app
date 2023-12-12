import {protectRoutes} from '@hilla/react-auth';
import HomePage from '@/views/HomePage/HomePage';
import LoginView from 'Frontend/views/login/LoginView.js';
import MainLayout from 'Frontend/views/MainLayout.js';
import {lazy} from 'react';
import {createBrowserRouter, RouteObject} from 'react-router-dom';
import AccountVerification from "@/views/verification/account/AccountVerification";
import RegistrationView from "@/views/registration/registrationView";
import NotFoundPage from "@/views/404NotFound/NotFound";
import ForgotPasswordView from "@/views/forgotpass/forgotpasswordd";
import ForgotPasswordVerificationView
    from "@/views/verification/ForgotPasswordTokenVerificationView/ForgotPasswordVerificationView";
import AllFaqs from "@/views/allfaqs/allFAQs";
import CreateQuiz from "@/views/quiz/creators/createQuiz";
import FaqOperations from "@/views/admin/faqOperations/faqOperations";
import AdminDashboardLayout from "@/views/admin/adminDashboardLayout";
import UserOperations from "@/views/admin/userOperations/userOperations";
import SystemActivity from "@/views/admin/activity/systemActivity";
import QuizOperations from "@/views/admin/quizOperations/quizOperations";
import PaymentSuccess from "@/views/payment/success";
import PaymentCancel from "@/views/payment/cancel";
import QuizPlayer from "@/views/quiz/play/quizPlayer";
import PrivacyAndPolicy from "@/views/privacyAndPolicy/privacyAndPolicy";
import ListOfQuizzes from "@/views/quiz/ListOfQuizzes/listOfQuizzes";
import TermsAndServices from "@/views/termsOfServices/termsOfServices";

const AboutView = lazy(async () => import('Frontend/views/about/AboutView.js'));

export const routes = protectRoutes([
    {
        element: <MainLayout/>,
        handle: {title: "Main"},
        children: [
            {path: "/", element: <HomePage/>, handle: {title: "Home QuizBotIQ", requiresLogin: false}},
            {path: "/allfaqs", element: <AllFaqs/>, handle: {title: "Home QuizBotIQ", requiresLogin: false}},
            {
                path: "/quiz/create-quiz", element:
                    <CreateQuiz/>, handle: {title: "Quiz Creation Page", requiresLogin: true}
            },
            {
                path: "/quiz/play/:id", element:
                    <QuizPlayer/>, handle: {title: "Dynamic Title", requiresLogin: true}
            },
            {
                path: "/quiz/list", element:
                    <ListOfQuizzes/>, handle: {title: "Quizzes", requiresLogin: false}
            },
            {path: '/about', element: <AboutView/>, handle: {title: "About", requiresLogin: false}},
            {path: '/privacy-and-policy', element: <PrivacyAndPolicy/>, handle: {title: "Privacy & Policy", requiresLogin: false}},
            {path: '/terms-of-services', element: <TermsAndServices/>, handle: {title: "Terms Of Services", requiresLogin: false}},
            {
                element: <AdminDashboardLayout/>, handle: {requiresLogin: true, rolesAllowed: ["ADMIN"]},
                children: [
                    {
                        path: "/admin/faq-ops",
                        element:
                            <FaqOperations/>,
                        handle: {title: "FAQ Operations", requiresLogin: true, rolesAllowed: ["ADMIN"]}
                    },
                    {
                        path: "/admin/user-ops",
                        element:
                            <UserOperations/>,
                        handle: {title: "User Operations", requiresLogin: true, rolesAllowed: ["ADMIN"]}
                    },
                    {
                        path: "/admin/system-stats",
                        element:
                            <SystemActivity/>,
                        handle: {title: "System Stats", requiresLogin: true, rolesAllowed: ["ADMIN"]}
                    },
                    {
                        path: "/admin/quizzes",
                        element:
                            <QuizOperations/>,
                        handle: {title: "Quizzes", requiresLogin: true, rolesAllowed: ["ADMIN"]}
                    },
                ]
            },
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
        path: "/auth/forgot/password",
        element: <ForgotPasswordView/>,
        handle: {title: "Forgot Account Password", requiresLogin: false}
    },
    {
        path: "/auth/verify/account/forgot-password",
        element: <ForgotPasswordVerificationView/>,
        handle: {title: "Verify ForgotPassword Link", requiresLogin: false}
    },

    {
        path: "/payment/success",
        element: <PaymentSuccess/>,
        handle: {title: "Payment is successful", requiresLogin: true}
    },

    {
        path: "/payment/cancel",
        element: <PaymentCancel/>,
        handle: {title: "Payment is successful", requiresLogin: true}
    },

    {
        path: "*",
        element: <NotFoundPage/>,
        handle: {title: "404 NOT FOUND", requiresLogin: false}
    }
]) as RouteObject[];

export default createBrowserRouter(routes);
