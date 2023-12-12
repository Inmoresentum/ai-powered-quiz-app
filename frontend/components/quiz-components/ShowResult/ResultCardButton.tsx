import {useNavigate} from "react-router-dom";
import {QuizEndpoint} from "@/generated/endpoints";

export default function ResultCardContinueButton({quizId, score}: any) {
    const navigate = useNavigate();
    async function handleClick() {
        await QuizEndpoint.saveScore(quizId, score);
        navigate("/quiz/list");
    }

    return <button className="src-button"
                   onClick={event => handleClick()}>
        Continue
    </button>;
}
