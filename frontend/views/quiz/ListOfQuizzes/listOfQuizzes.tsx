import {useQuery} from "react-query";
import {QuizEndpoint} from "@/generated/endpoints";
import QuizCard from "@/components/quiz-components/quiz-card/QuizCard";
import {Helmet} from "react-helmet-async";
import React from "react";

export default function ListOfQuizzes() {
    const query = useQuery({queryKey: ['all-quizzes'], queryFn: QuizEndpoint.getAllQuizzes})
    return (
        <>
            <Helmet>
                <title>Quizzes</title>
                <meta name="description"
                      content="Here you can find all the quizzes"/>
            </Helmet>
            <div
                className="pt-24 pb-10 max-w-[1280px] m-auto gap-3 flex justify-center content-center flex-row flex-wrap">
                {query.data?.map(quiz => (
                    <QuizCard key={quiz.quizId} quiz={quiz}/>
                ))}
            </div>
        </>
    );
}