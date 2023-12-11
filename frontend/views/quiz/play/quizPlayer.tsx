import Quiz from "@/components/quiz-components/core-starter/Quiz";
import {quiz} from "./QuizMockData"
export default function QuizPlayer() {
    return (
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
    );
}