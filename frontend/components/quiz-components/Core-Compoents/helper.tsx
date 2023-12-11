import snarkdown from "snarkdown";
import dompurify from "dompurify";
import { Dispatch, SetStateAction } from "react";

export const rawMarkup = (data: string | Node) => {
    const sanitizer = dompurify.sanitize;
    return {__html: snarkdown(sanitizer(data))};
};

export const checkAnswer = (index: number, correctAnswer: string | any[], answerSelectionType: string, {
    userInput,
    userAttempt,
    currentQuestionIndex,
    continueTillCorrect,
    showNextQuestionButton,
    incorrect,
    correct,
    setButtons,
    setCorrectAnswer,
    setIncorrectAnswer,
    setCorrect,
    setIncorrect,
    setShowNextQuestionButton,
    setUserInput,
    setUserAttempt,
}: { userInput: never[]; userAttempt: number; currentQuestionIndex: number; continueTillCorrect: any; showNextQuestionButton: boolean; incorrect: never[]; correct: never[]; setButtons: Dispatch<SetStateAction<{}>>; setCorrectAnswer: Dispatch<SetStateAction<boolean>>; setIncorrectAnswer: Dispatch<SetStateAction<boolean>>; setCorrect: Dispatch<SetStateAction<never[]>>; setIncorrect: Dispatch<SetStateAction<never[]>>; setShowNextQuestionButton: Dispatch<SetStateAction<boolean>>; setUserInput: Dispatch<SetStateAction<never[]>>; setUserAttempt: Dispatch<SetStateAction<number>>; }) => {
    const indexStr = `${index}`;
    const disabledAll = {
        0: { disabled: true },
        1: { disabled: true },
        2: { disabled: true },
        3: { disabled: true },
    };
    const userInputCopy = [...userInput];
    if (answerSelectionType === "single") {
        if (userInputCopy[currentQuestionIndex] === undefined) {
            // @ts-ignore
            userInputCopy[currentQuestionIndex] = index;
        }

        if (indexStr === correctAnswer) {
            // @ts-ignore
            if (incorrect.indexOf(currentQuestionIndex) < 0 && correct.indexOf(currentQuestionIndex) < 0) {
                // @ts-ignore
                correct.push(currentQuestionIndex);
            }

            setButtons((prevState) => ({
                ...prevState,
                ...disabledAll,
                [index - 1]: {
                    className: (indexStr === correctAnswer) ? "correct" : "incorrect",
                },
            }));

            setCorrectAnswer(true);
            setIncorrectAnswer(false);
            setCorrect(correct);
            setShowNextQuestionButton(true);
        } else {
            // @ts-ignore
            if (correct.indexOf(currentQuestionIndex) < 0 && incorrect.indexOf(currentQuestionIndex) < 0) {
                // @ts-ignore
                incorrect.push(currentQuestionIndex);
            }

            if (continueTillCorrect) {
                setButtons((prevState) => (
                    {

                        ...prevState,
                        [index - 1]: {
                            // @ts-ignore
                            disabled: !prevState[index - 1],
                        },
                    }
                ));
            } else {
                setButtons((prevState) => (
                    {

                        ...prevState,
                        ...disabledAll,
                        [index - 1]: {
                            className: (indexStr === correctAnswer) ? "correct" : "incorrect",
                        },
                    }
                ));

                setShowNextQuestionButton(true);
            }

            setIncorrectAnswer(true);
            setCorrectAnswer(false);
            setIncorrect(incorrect);
        }
    } else {
        const maxNumberOfMultipleSelection = correctAnswer.length;

        if (userInputCopy[currentQuestionIndex] === undefined) {
            // @ts-ignore
            userInputCopy[currentQuestionIndex] = [];
        }

        // @ts-ignore
        if (userInputCopy[currentQuestionIndex].length < maxNumberOfMultipleSelection) {
            // @ts-ignore
            userInputCopy[currentQuestionIndex].push(index);

            // @ts-ignore
            if (correctAnswer.includes(index)) {
                // @ts-ignore
                if (userInputCopy[currentQuestionIndex].length <= maxNumberOfMultipleSelection) {
                    setButtons((prevState) => ({
                        ...prevState,
                        [index - 1]: {
                            // @ts-ignore
                            disabled: !prevState[index - 1],
                            // @ts-ignore
                            className: (correctAnswer.includes(index)) ? "correct" : "incorrect",
                        },
                    }));
                }
                // @ts-ignore
            } else if (userInputCopy[currentQuestionIndex].length <= maxNumberOfMultipleSelection) {
                setButtons((prevState) => ({
                    ...prevState,
                    [index - 1]: {
                        // @ts-ignore
                        className: (correctAnswer.includes(index)) ? "correct" : "incorrect",
                    },
                }));
            }
        }

        if (maxNumberOfMultipleSelection === userAttempt) {
            let cnt = 0;
            for (let i = 0; i < correctAnswer.length; i += 1) {
                // @ts-ignore
                if (userInputCopy[currentQuestionIndex].includes(correctAnswer[i])) {
                    cnt += 1;
                }
            }

            if (cnt === maxNumberOfMultipleSelection) {
                // @ts-ignore
                correct.push(currentQuestionIndex);

                setCorrectAnswer(true);
                setIncorrectAnswer(false);
                setCorrect(correct);
                setShowNextQuestionButton(true);
                setUserAttempt(1);
            } else {
                // @ts-ignore
                incorrect.push(currentQuestionIndex);

                setIncorrectAnswer(true);
                setCorrectAnswer(false);
                setIncorrect(incorrect);
                setShowNextQuestionButton(true);
                setUserAttempt(1);
            }
        } else if (!showNextQuestionButton) {
            setUserAttempt(userAttempt + 1);
        }
    }
    setUserInput(userInputCopy);
};

export const selectAnswer = (index: number, correctAnswer: string | number | any[], answerSelectionType: string, {
    userInput,
    currentQuestionIndex,
    setButtons,
    setShowNextQuestionButton,
    incorrect,
    correct,
    setCorrect,
    setIncorrect,
    setUserInput,
}: { userInput: never[]; currentQuestionIndex: number; setButtons: Dispatch<SetStateAction<{}>>; setShowNextQuestionButton: Dispatch<SetStateAction<boolean>>; incorrect: never[]; correct: never[]; setCorrect: Dispatch<SetStateAction<never[]>>; setIncorrect: Dispatch<SetStateAction<never[]>>; setUserInput: Dispatch<SetStateAction<never[]>>; }) => {
    const selectedButtons = {
        0: { selected: false },
        1: { selected: false },
        2: { selected: false },
        3: { selected: false },
    };
    const userInputCopy = [...userInput];
    if (answerSelectionType === "single") {
        correctAnswer = Number(correctAnswer);
        // @ts-ignore
        userInputCopy[currentQuestionIndex] = index;

        if (index === correctAnswer) {
            // @ts-ignore
            if (correct.indexOf(currentQuestionIndex) < 0) {
                // @ts-ignore
                correct.push(currentQuestionIndex);
            }
            // @ts-ignore
            if (incorrect.indexOf(currentQuestionIndex) >= 0) {
                // @ts-ignore
                incorrect.splice(incorrect.indexOf(currentQuestionIndex), 1);
            }
        } else {
            // @ts-ignore
            if (incorrect.indexOf(currentQuestionIndex) < 0) {
                // @ts-ignore
                incorrect.push(currentQuestionIndex);
            }
            // @ts-ignore
            if (correct.indexOf(currentQuestionIndex) >= 0) {
                // @ts-ignore
                correct.splice(correct.indexOf(currentQuestionIndex), 1);
            }
        }
        setCorrect(correct);
        setIncorrect(incorrect);

        setButtons((prevState) => ({
            ...prevState,
            ...selectedButtons,
            [index - 1]: {
                className: "selected",
            },
        }));

        setShowNextQuestionButton(true);
    } else {
        if (userInputCopy[currentQuestionIndex] === undefined) {
            // @ts-ignore
            userInputCopy[currentQuestionIndex] = [];
        }
        // @ts-ignore
        if (userInputCopy[currentQuestionIndex].includes(index)) {
            // @ts-ignore
            userInputCopy[currentQuestionIndex].splice(userInputCopy[currentQuestionIndex].indexOf(index), 1);
        } else {
            // @ts-ignore
            userInputCopy[currentQuestionIndex].push(index);
        }

        // @ts-ignore
        if (userInputCopy[currentQuestionIndex].length === correctAnswer.length) {
            let exactMatch = true;
            // @ts-ignore
            for (const input of userInput[currentQuestionIndex]) {
                // @ts-ignore
                if (!correctAnswer.includes(input)) {
                    exactMatch = false;
                    // @ts-ignore
                    if (incorrect.indexOf(currentQuestionIndex) < 0) {
                        // @ts-ignore
                        incorrect.push(currentQuestionIndex);
                    }
                    // @ts-ignore
                    if (correct.indexOf(currentQuestionIndex) >= 0) {
                        // @ts-ignore
                        correct.splice(correct.indexOf(currentQuestionIndex), 1);
                    }
                    break;
                }
            }
            if (exactMatch) {
                // @ts-ignore
                if (correct.indexOf(currentQuestionIndex) < 0) {
                    // @ts-ignore
                    correct.push(currentQuestionIndex);
                }
                // @ts-ignore
                if (incorrect.indexOf(currentQuestionIndex) >= 0) {
                    // @ts-ignore
                    incorrect.splice(incorrect.indexOf(currentQuestionIndex), 1);
                }
            }
        } else {
            // @ts-ignore
            if (incorrect.indexOf(currentQuestionIndex) < 0) {
                // @ts-ignore
                incorrect.push(currentQuestionIndex);
            }
            // @ts-ignore
            if (correct.indexOf(currentQuestionIndex) >= 0) {
                // @ts-ignore
                correct.splice(correct.indexOf(currentQuestionIndex), 1);
            }
        }
        setCorrect(correct);
        setIncorrect(incorrect);
        setButtons((prevState) => ({
            ...prevState,
            [index - 1]: {
                // @ts-ignore
                className: userInputCopy[currentQuestionIndex].includes(index) ? "selected" : undefined,
            },
        }));

        // @ts-ignore
        if (userInputCopy[currentQuestionIndex].length > 0) {
            setShowNextQuestionButton(true);
        }
    }
    setUserInput(userInputCopy);
};
