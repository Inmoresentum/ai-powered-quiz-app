import Quiz from "@/components/quiz-components/core-starter/Quiz";
import {useParams} from "react-router-dom";
import {useQuery} from "react-query";
import {QuizEndpoint} from "@/generated/endpoints";

export default function QuizPlayer() {
    const param = useParams();
    const quizId = parseInt(param.id as string);
    const query = useQuery({queryKey: ['quiz', param.id], queryFn: () => QuizEndpoint.getQuiz(quizId)})
    if (query.status === "loading") return <div>Loading...</div>
    console.log(query.data);
    return (
        <div className="flex items-center justify-center bg-gradient-to-r from-rose-100 to-teal-100 rounded-3xl">
            <Quiz
                quiz={query.data}
                shuffle={true}
                // showInstantFeedback
                // continueTillCorrect
                onQuestionSubmit={(obj: any) => console.log("user question results:", obj)}
                disableSynopsis={false}
                // revealAnswerOnSubmit={true}
                // allowNavigation={true}
            />
        </div>
    );
}