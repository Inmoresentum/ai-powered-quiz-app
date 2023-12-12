import Quiz from "@/components/quiz-components/core-starter/Quiz";
import {quiz} from "./QuizMockData"

export default function QuizPlayer() {

    return (
        <div className="flex items-center justify-center bg-gradient-to-r from-rose-100 to-teal-100 rounded-3xl">
            <Quiz
                quiz={quiz}
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