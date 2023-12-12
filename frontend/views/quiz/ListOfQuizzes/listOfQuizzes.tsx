import {useQuery} from "react-query";
import {QuizEndpoint} from "@/generated/endpoints";
import QuizCard from "@/components/quiz-components/quiz-card/QuizCard";

export default function ListOfQuizzes() {
    const query = useQuery({queryKey: ['all-quizzes'], queryFn: QuizEndpoint.getAllQuizzes})
    return (
        <>
            <div
                className="pt-24 pb-10 max-w-[1280px] m-auto gap-3 flex justify-center content-center flex-row flex-wrap">
                {query.data?.map(quiz => (
                    <QuizCard key={quiz.quizId} quiz={quiz}/>
                ))}
            </div>
        </>
    );
}