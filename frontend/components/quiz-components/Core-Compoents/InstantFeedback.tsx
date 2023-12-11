import React, { useEffect } from "react";
import Explanation from "./Explanation.js";

const renderMessageForCorrectAnswer = (question: { messageForCorrectAnswer: any; }) => {
    const defaultMessage = "You are correct. Please click Next to continue.";
    return question.messageForCorrectAnswer || defaultMessage;
};

const renderMessageForIncorrectAnswer = (question: { messageForIncorrectAnswer: any; }) => {
    const defaultMessage = "Incorrect answer. Please try again.";
    return question.messageForIncorrectAnswer || defaultMessage;
};

const InstantFeedback = function ({
// @ts-ignore
                                      showInstantFeedback, incorrectAnswer, correctAnswer, question, onQuestionSubmit, userAnswer,
                                  }) {
    useEffect(() => {
        if (onQuestionSubmit && (correctAnswer || incorrectAnswer)) {
            onQuestionSubmit({ question, userAnswer, isCorrect: correctAnswer });
        }
    }, [correctAnswer, incorrectAnswer]);

    return (
        <>
            {incorrectAnswer && showInstantFeedback
                && <div className="alert incorrect">{renderMessageForIncorrectAnswer(question)}</div>}
            {correctAnswer && showInstantFeedback
                && (
                    <div className="alert correct">
                        {renderMessageForCorrectAnswer(question)}
                        <Explanation question={question} isResultPage={false} />
                    </div>
                )}
        </>
    );
};

export default InstantFeedback;
