import {QuizAdminEndpoint} from "@/generated/endpoints";
import QuizModel from "@/generated/com/example/application/entities/quiz/QuizModel";
import {AutoCrud} from "@hilla/react-crud";
import {Helmet} from "react-helmet-async";
import React from "react";

export default function QuizOperations() {
    return (
        <div className="flex items-center justify-center h-[1080px] w-full">
            <Helmet>
                <title>Quiz Operations</title>
                <meta name="description"
                      content="Quiz Operations For Admins"/>
            </Helmet>
            <AutoCrud service={QuizAdminEndpoint} model={QuizModel}
                      className="h-full shadow-2xl rounded-md max-w-[1280px] w-full"/>
        </div>
    );
}