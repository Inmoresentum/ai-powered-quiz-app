import {string, z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Controller, useForm} from "react-hook-form";
import {Button} from "@/components/ui/button";
import React, {useState} from "react";

const questionSchema = z.object({
    title: z.string().nonempty({message: "Question title is required"}),
    type: z.string().nonempty({message: "Question type is required"}),
    answers: z.array(z.any()).nonempty({message: "At least one answer is required"}),
    answerType: z.string().nonempty({message: "Answer type is required"}),
    correctAnswer: z.any(),
    correctAnswers: z.array(z.boolean()),
    correctMessage: z.string().nonempty({message: "Message for correct answer is required"}),
    wrongMessage: z.string().nonempty({message: "Message for wrong answer is required"}),
    explanation: z.string().nonempty({message: "Explanation is required"}),
    points: z.number().positive({message: "Points must be a positive number"})
});

type quizCreatorQuestionType = z.infer<typeof questionSchema>;
const schema = z.object({
    quizTitle: z.string()
        .nonempty({message: "Quiz title is required"})
        .refine((value) => value.length >= 3, {message: "Quiz title must be at least 3 characters long"}),
    quizSynopsis: z.string()
        .nonempty({message: "Quiz synopsis is required"})
        .refine((value) => value.length >= 10, {message: "Quiz synopsis must be at least 10 characters long"}),
    quizProfileImage: z.any(),
    quizTags: z.string().nonempty({message: "Quiz tag is required"}),
    difficulty: z.string().nonempty({message: "Difficulty level is required"}),
    questions: z.array(
        questionSchema
    ).nonempty({message: "At least one question is required"})
});

type quizCreatorSchemaType = z.infer<typeof schema>;
const CreateQuiz: React.FC = () => {
    const {register, handleSubmit, reset, watch, setValue, formState: {errors, isSubmitted, isSubmitting, isSubmitSuccessful}} = useForm<quizCreatorSchemaType>({
        resolver: zodResolver(schema),
        defaultValues: {
            quizTitle: "",
            quizSynopsis: "",
            quizTags: "SCIENCE",
            difficulty: "EASY",
            questions: []
        }
    });

    const [questions, setQuestions] = useState<quizCreatorQuestionType[]>([]);


    // Loop over the errors object and create a separate toast for each error
    // const [submitted, setSubmitted] = useState(null)
    const quizProfileImageFile = watch("quizProfileImage");
    let quizProfileImageURL = null;
    try {
        quizProfileImageURL = quizProfileImageFile ? URL.createObjectURL(quizProfileImageFile[0]) : null;
    } catch (e) {
        quizProfileImageURL = null;
    }

    const onSubmit = async (data: quizCreatorSchemaType) => {
        console.log(questions);
        // Check if there is at least one correct answer
        console.log(data);
    };

    const addQuestion = () => {
        setQuestions([...questions, {answers: []}]);
    };

    const addAnswer = (index: number) => {
        const newQuestions = [...questions];
        newQuestions[index].answers.push("");
        setQuestions(newQuestions);
    };

    const clearAll = () => {
        reset();
        setQuestions([]);
    };

    // Function to handle image upload
    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>, index: number, answerIndex: number) => {
        console.log("I am in handleImageUpload arrow function");
    };

    return (
        <div className="flex justify-center items-center pt-24 pb-10">
            <form
                className="p-14 bg-gray-100 rounded-2xl shadow-2xl max-w-[680px] w-full hover:bg-white
                duration-300 ease-linear"
                onSubmit={handleSubmit(onSubmit)}
            >
                <h2 className="text-3xl font-bold mb-4 text-center text-rose-400">Create a Quiz</h2>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 font-medium mb-2"
                        htmlFor="quizTitle"
                    >
                        Quiz Title
                    </label>
                    <input
                        className="w-full p-2 border border-gray-300 rounded-md"
                        type="text"
                        id="quizTitle"
                        {...register("quizTitle")}
                    />
                    {errors.quizTitle && <p className="text-red-500">{errors.quizTitle.message}</p>}
                </div>

                <div className="mb-4">
                    <label
                        className="block text-gray-700 font-medium mb-2"
                        htmlFor="quizSynopsis"
                    >
                        Quiz Synopsis
                    </label>
                    <textarea
                        className="w-full p-2 border border-gray-300 rounded-md"
                        id="quizSynopsis"
                        {...register("quizSynopsis")}
                    />
                    {errors.quizSynopsis && <p className="text-red-500">{errors.quizSynopsis.message}</p>}
                </div>

                <div className="mb-4">
                    <label
                        className="block text-gray-700 font-medium mb-2"
                        htmlFor="quizProfileImage"
                    >
                        Quiz Profile Image
                    </label>
                    <input
                        className="w-full p-2 border border-gray-300 rounded-md"
                        type="file"
                        accept="image/*"
                        id="quizProfileImage"
                        {...register("quizProfileImage")}
                    />
                    {quizProfileImageURL && (
                        <img
                            className="w-full mt-4 rounded-md object-cover"
                            src={quizProfileImageURL}
                            alt="Quiz Profile Image Preview"
                        />
                    )}
                </div>

                {/* Add the following code after the "Quiz Profile Image" input field */}
                <div className="mb-4">
                    <label
                        className="block text-gray-700 font-medium mb-2"
                        htmlFor="quizTags"
                    >
                        Quiz Tags
                    </label>
                    <select
                        className="w-full p-2 border border-gray-300 rounded-md"
                        id="quizTags"
                        {...register("quizTags")}
                    >
                        <option value="">Select a tag</option>
                        <option value="SCIENCE">SCIENCE</option>
                        <option value="ARTS">ARTS</option>
                        <option value="DRAW">DRAW</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label
                        className="block text-gray-700 font-medium mb-2"
                        htmlFor="difficulty"
                    >
                        Difficulty
                    </label>
                    <select
                        className="w-full p-2 border border-gray-300 rounded-md"
                        id="difficulty"
                        {...register("difficulty")}
                    >
                        <option value="">Select a difficulty</option>
                        <option value="EASY">EASY</option>
                        <option value="NORMAL">NORMAL</option>
                        <option value="MODERATE">MODERATE</option>
                        <option value="HARD">HARD</option>
                        <option value="CRAZY">CRAZY</option>
                    </select>
                </div>

                <div className="flex justify-center">
                    <Button
                        className="px-4 py-2 bg-blue-500 text-white rounded-full mb-4 duration-300"
                        type="button"
                        onClick={addQuestion}
                    >
                        Add Question
                    </Button>
                </div>

                {questions.map((question, index) => {
                    // @ts-ignore
                    const answers = watch(`questions.${index}.answers`, []);
                    const answerImageURLs = answers.map((answer) => {
                        if (watch(`questions.${index}.type`) === "image" && answer && answer[0]) {
                            return URL.createObjectURL(answer[0]);
                        } else {
                            return null;
                        }
                    });

                    return (
                        <div key={index} className="mb-4">
                            <div className="text-xl font-semibold text-red-500
                             mt-1.5 mb-1.5 italic underline text-center"># Question {index + 1}</div>
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 font-medium mb-2"
                                    htmlFor={`questionTitle${index}`}
                                >
                                    Question Title
                                </label>
                                <input
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    type="text"
                                    id={`questionTitle${index}`}
                                    {...register(`questions.${index}.title`)}
                                />
                                {errors.questions?.[index]?.title && (
                                    <p className="text-red-500">{errors.questions[index].title.message}</p>
                                )}
                            </div>

                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 font-medium mb-2"
                                    htmlFor={`questionType${index}`}
                                >
                                    Question Type
                                </label>
                                <select
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    id={`questionType${index}`}
                                    {...register(`questions.${index}.type`, {
                                        onChange: (event) => {
                                            if (event.target.value === "text") {
                                                setValue(`questions.${index}.answers`, []);
                                            }
                                        }
                                    })}
                                >
                                    <option value="">Select a type</option>
                                    <option value="text">Text</option>
                                    <option value="image">Image</option>
                                </select>
                            </div>

                            <div className="flex justify-center">
                                <Button
                                    className="px-4 py-2 bg-blue-500 text-white rounded-full mb-4"
                                    type="button"
                                    onClick={() => addAnswer(index)}
                                >
                                    Add Answer
                                </Button>
                            </div>

                            {question.answers.map((answer, answerIndex) =>
                                watch(`questions.${index}.type`) === "text" ? (
                                    <input
                                        key={answerIndex}
                                        className="w-full p-2 border border-gray-300 rounded-md mb-4"
                                        type="text"
                                        {...register(`questions.${index}.answers.${answerIndex}`)}
                                    />
                                ) : (
                                    <>
                                        <input
                                            key={answerIndex}
                                            className="w-full p-2 border border-gray-300 rounded-md mb-4"
                                            type="file"
                                            accept="image/*"
                                            onChange={(event) => handleImageUpload(event, index, answerIndex)}
                                            {...register(`questions.${index}.answers.${answerIndex}`)}
                                        />
                                        {answerImageURLs[answerIndex] && (
                                            <img
                                                className="w-full mt-4 rounded-md object-cover"
                                                src={answerImageURLs[answerIndex]}
                                                alt={`Answer ${answerIndex + 1} Preview`}
                                            />
                                        )}
                                    </>
                                )
                            )}

                            {question.answers.length > 0 && (
                                <>
                                    <div className="mb-4">
                                        <label
                                            className=
                                                "block text-gray-700 font-medium mb-2"
                                            htmlFor={`answerType${index}`}
                                        >
                                            Answer Type
                                        </label>
                                        <select
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                            id={`answerType${index}`}
                                            {...register(`questions.${index}.answerType`)}
                                        >
                                            <option value="">Select a type</option>
                                            <option value="single">Single</option>
                                            <option value="multiple">Multiple</option>
                                        </select>
                                    </div>

                                    <div className="mb-4">
                                        <label
                                            className="block text-gray-700 font-medium mb-2"
                                            htmlFor={`correctAnswer${index}`}
                                        >
                                            Correct Answer
                                        </label>
                                        {watch(`questions.${index}.answerType`) === "single" ? (
                                            <select
                                                className="w-full p-2 border border-gray-300 rounded-md"
                                                id={`correctAnswer${index}`}
                                                {...register(`questions.${index}.correctAnswer`)}
                                            >
                                                <option value="">Select an answer</option>
                                                {question.answers.map((answer, answerIndex) => (
                                                    <option key={answerIndex} value={answerIndex}>
                                                        Answer {answerIndex + 1}
                                                    </option>
                                                ))}
                                            </select>
                                        ) : (
                                            question.answers.map((answer, answerIndex) => (
                                                <div key={answerIndex} className="flex items-center mb-2">
                                                    <input
                                                        type="checkbox"
                                                        id={`correctAnswer${index}${answerIndex}`}
                                                        {...register(`questions.${index}.correctAnswers.${answerIndex}`, {
                                                            setValueAs: (value) => value ? answerIndex : null
                                                        })}
                                                    />
                                                    <label
                                                        className="ml-2"
                                                        htmlFor={`correctAnswer${index}${answerIndex}`}
                                                    >
                                                        Answer {answerIndex + 1}
                                                    </label>
                                                </div>
                                            ))
                                        )}
                                    </div>

                                    <div className="mb-4"><label
                                        className="block text-gray-700 font-medium mb-2"
                                        htmlFor={`correctMessage${index}`}
                                    >
                                        Message for Correct Answer
                                    </label>
                                        <textarea
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                            id={`correctMessage${index}`}
                                            {...register(`questions.${index}.correctMessage`)}
                                        />
                                        {errors.questions?.[index]?.correctMessage && (
                                            <p className="text-red-500">{errors.questions[index].correctMessage.message}</p>
                                        )}
                                    </div>

                                    <div className="mb-4">
                                        <label
                                            className="block text-gray-700 font-medium mb-2"
                                            htmlFor={`wrongMessage${index}`}
                                        >
                                            Message for Wrong Answer
                                        </label>
                                        <textarea
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                            id={`wrongMessage${index}`}
                                            {...register(`questions.${index}.wrongMessage`)}
                                        />
                                        {errors.questions?.[index]?.wrongMessage && (
                                            <p className="text-red-500">{errors.questions[index].wrongMessage.message}</p>
                                        )}
                                    </div>

                                    <div className="mb-4">
                                        <label
                                            className="block text-gray-700 font-medium mb-2"
                                            htmlFor={`explanation${index}`}
                                        >
                                            Explanation
                                        </label>
                                        <textarea
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                            id={`explanation${index}`}
                                            {...register(`questions.${index}.explanation`)}
                                        />
                                        {errors.questions?.[index]?.explanation && (
                                            <p className="text-red-500">{errors.questions[index].explanation.message}</p>
                                        )}
                                    </div>

                                    <div className="mb-4">
                                        <label
                                            className=
                                                "block text-gray-700 font-medium mb-2"
                                            htmlFor={`points${index}`}
                                        >
                                            Points
                                        </label>
                                        <input
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                            type="number"
                                            id={`points${index}`}
                                            {...register(`questions.${index}.points`, {
                                                setValueAs: (value) => parseInt(value)
                                            })}
                                        />
                                        {errors.questions?.[index]?.points && (
                                            <p className="text-red-500">{errors.questions[index].points.message}</p>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    );
                })}

                <div className="flex justify-end">
                    <Button
                        className="px-4 py-2 bg-green-500 font-semibold w-32 hover:bg-green-600
                         text-white hover:text-black rounded-full mr-4 duration-300"
                        type="submit"
                    >
                        SUBMIT
                    </Button>
                    <Button
                        className="px-4 py-2 bg-red-500 w-32 font-semibold text-white rounded-full
                         hover:bg-red-600 hover:text-black duration-300"
                        type="reset"
                        onClick={clearAll}
                    >
                        CLEAR ALL
                    </Button>
                </div>
            </form>
        </div>
    );
}
export default CreateQuiz;