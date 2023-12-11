import React, {useState} from "react";
import {
    useForm,
    useFieldArray,
    Control,
    UseFieldArrayRemove,
    FieldErrorsImpl,
    DeepRequired,
    GlobalError,
    UseFormWatch, FieldArrayWithId, UseFormRegister, FieldValues,
} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {Button} from "@/components/ui/button";
import {Loader2} from "lucide-react";

const questionSchema = z.object({
    title: z.string().min(1, {message: "Question title is required"}),
    questionType: z.string().min(1, {message: "Question type is required"}),
    answers: z.array(z.any()).min(1, {message: "At least one answer is required"}),
    answerType: z.string().min(1, {message: "Answer type is required"}),
    correctAnswer: z.any(),
    correctAnswers: z.array(z.boolean()),
    correctMessage: z.string().min(1, {message: "Message for correct answer is required"}),
    wrongMessage: z.string().min(1, {message: "Message for wrong answer is required"}),
    explanation: z.string().min(1, {message: "Explanation is required"}),
    points: z.number().positive({message: "Points must be a positive number"})
});

const quizCreatorSchema = z.object({
    quizTitle: z.string()
        .min(1, {message: "Quiz title is required"})
        .refine(value => value.length >= 3, {message: "Quiz title must be at least 3 characters long"}),
    quizSynopsis: z.string()
        .min(1, {message: "Quiz synopsis is required"})
        .refine(value => value.length >= 10, {message: "Quiz synopsis must be at least 10 characters long"}),
    quizProfileImage: z.any(),
    quizTags: z.string().min(1, {message: "Quiz tag is required"}),
    difficulty: z.string().min(1, {message: "Difficulty level is required"}),
    questions: z.array(questionSchema).nonempty({message: "At least one question is required"})
});

type QuizCreatorSchemaType = z.infer<typeof quizCreatorSchema>;

const CreateQuiz: React.FC = () => {
    const {
        register,
        handleSubmit,
        control,
        watch,
        formState: {errors, isSubmitting, isSubmitSuccessful, isLoading}
    } = useForm<QuizCreatorSchemaType>({
        resolver: zodResolver(quizCreatorSchema),
        defaultValues: {
            quizTitle: "",
            quizSynopsis: "",
            quizTags: "SCIENCE",
            difficulty: "EASY",
            questions: [{
                answers: [],
                answerType: "single",
                correctAnswers: [],
                correctMessage: "",
                wrongMessage: "",
                explanation: "",
                points: 0.0,
                title: ""
            }]
        }
    });

    const quizProfileImageFile = watch("quizProfileImage");
    const [isFormSubmitting, setIsFormSubmitting] = useState(false);
    let quizProfileImageURL: null | string;
    try {
        quizProfileImageURL = quizProfileImageFile ? URL.createObjectURL(quizProfileImageFile[0]) : null;
    } catch (e) {
        quizProfileImageURL = null;
    }
    const {fields: questionFields, append: appendQuestion, remove: removeQuestion} = useFieldArray({
        control,
        name: "questions"
    });

    const onSubmit = async (data: QuizCreatorSchemaType) => {
        setIsFormSubmitting(true);
        await new Promise(resolve => setTimeout(resolve, 10000));
        setIsFormSubmitting(false);
        console.log(data);
    };

    return (
        <div className="flex justify-center items-center pt-24 pb-10">
            <form onSubmit={handleSubmit(onSubmit)}
                  className="p-14 bg-gray-100 rounded-2xl shadow-2xl max-w-[680px] w-full hover:bg-white duration-300 ease-linear flex flex-col">
                <h2 className="text-3xl font-bold mb-4 text-center text-rose-400">Create a Quiz</h2>

                {/* Quiz Title */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="quizTitle">Quiz Title</label>
                    <input className="w-full p-2 border border-gray-300 rounded-md" type="text" id="quizTitle"
                           required {...register("quizTitle")} />
                    {errors.quizTitle && <p className="text-red-500">{errors.quizTitle.message}</p>}
                </div>

                {/* Quiz Synopsis */}
                <div className="mb-4" key="quizSynopsis">
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="quizSynopsis">Quiz Synopsis</label>
                    <textarea className="w-full p-2 border border-gray-300 rounded-md" id="quizSynopsis"
                              required {...register("quizSynopsis")} />
                    {errors.quizSynopsis && <p className="text-red-500">{errors.quizSynopsis.message}</p>}
                </div>

                {/* Quiz Profile Image */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="quizProfileImage">Quiz Profile
                        Image</label>
                    <input className="w-full p-2 border border-gray-300 rounded-md" type="file" accept="image/*"
                           id="quizProfileImage" required {...register("quizProfileImage")} />

                    {quizProfileImageURL && <img src={quizProfileImageURL} alt="gg"
                                                 className="w-full mt-4 rounded-md object-cover hover:scale-105 duration-300 ease-linear"/>}
                </div>

                {/* Quiz Tags */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="quizTags">Quiz Tags</label>
                    <select className="w-full p-2 border border-gray-300 rounded-md" id="quizTags"
                            required {...register("quizTags")}>
                        <option value="">Select a tag</option>
                        <option value="SCIENCE">SCIENCE</option>
                        <option value="ARTS">ARTS</option>
                        {/* TODO: add option according to the backend */}
                    </select>
                </div>

                {/* Difficulty */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="difficulty">Difficulty</label>
                    <select className="w-full p-2 border border-gray-300 rounded-md" id="difficulty"
                            required {...register("difficulty")}>
                        <option value="">Select a difficulty</option>
                        <option value="EASY">EASY</option>
                        <option value="NORMAL">NORMAL</option>
                        <option value="MODERATE">MODERATE</option>
                        <option value="HARD">HARD</option>
                        <option value="CRAZY">CRAZY</option>
                    </select>
                </div>

                {/* Questions List */}
                {questionFields.map((questionField, questionIndex) => {
                    const key = `question-${questionIndex}-${Math.random()}`;
                    return <Question key={key} control={control} questionField={questionField}
                                     questionIndex={questionIndex} removeQuestion={removeQuestion} errors={errors}
                        // @ts-ignore
                                     register={register} watch={watch}/>
                })}

                {/* Add Question Button */}
                <Button type="button" onClick={() => appendQuestion({
                    title: "",
                    questionType: "",
                    answers: [""],
                    answerType: "",
                    correctAnswer: null,
                    correctAnswers: [],
                    correctMessage: "",
                    wrongMessage: "",
                    explanation: "",
                    points: 0
                })} className="mt-2 rounded-full bg-green-500">
                    Add Question
                </Button>


                {/* User agreement */}
                <p className="mt-4 text-center text-sm text-gray-500">
                    By submitting you agree to our terms of services, policies, and conditions etc.
                </p>


                {/* Submit Button */}
                <Button className="mt-4 font-extrabold hover:bg-green-500 duration-500 flex-grow bg-blue-400 shadow-xl
             ease-linear rounded-full hover:-translate-y-1 hover:shadow-xl hover:drop-shadow-xl hover:shadow-green-600 hover:text-black"
                        type="submit"
                        disabled={isFormSubmitting}
                >{isFormSubmitting ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                        Please wait
                    </>
                ) : "Submit"}
                </Button>

            </form>
        </div>
    );
};

export default CreateQuiz;

type QuestionProp = {
    control: Control<QuizCreatorSchemaType, any>,
    questionIndex: number
    questionField: FieldArrayWithId<{} | ((formValues: QuizCreatorSchemaType) => QuizCreatorSchemaType) | QuizCreatorSchemaType, string, "id">,
    register: UseFormRegister<FieldValues>
    errors: Partial<FieldErrorsImpl<DeepRequired<QuizCreatorSchemaType>>> & {
        root?: Record<string, GlobalError> & GlobalError
    },
    watch: UseFormWatch<QuizCreatorSchemaType>,
    removeQuestion: UseFieldArrayRemove,
}

export function Question({
                             control,
                             questionIndex,
                             questionField,
                             register,
                             errors,
                             watch,
                             removeQuestion
                         }: QuestionProp) {
    const {fields: answerFields, append: appendAnswer, remove: removeAnswer} = useFieldArray({
        control,
        name: `questions.${questionIndex}.answers`
    });

    return (
        <div key={questionField.id + questionIndex + "some thing up-there"} className="flex flex-col space-y-4">

            <div className="text-xl font-semibold text-red-500
                             mt-1.5 mb-1.5 italic underline text-center"># Question {questionIndex + 1}</div>
            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                    Question Title
                </label>
                <input
                    className="w-full p-2 border border-gray-300 rounded-md"
                    {...register(`questions.${questionIndex}.title`)} placeholder="Question Title"

                />
                {errors.questions && errors.questions[questionIndex]?.title?.message &&
                    <p className="text-red-500">{errors.questions[questionIndex]?.title?.message}</p>}
            </div>

            <div className="mb-4">
                <label
                    className="block text-gray-700 font-medium mb-2">
                    Question Type
                </label>
                <select
                    className="w-full p-2 border border-gray-300 rounded-md"
                    {...register(`questions.${questionIndex}.questionType`)}>
                    <option value="text">Text</option>
                    <option value="image">Image</option>
                </select>
                {errors.questions?.[questionIndex]?.type &&
                    <p className="text-red-500">{errors.questions[questionIndex]?.questionType?.message}</p>}

            </div>


            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                    Answer Type
                </label>

                <select
                    className="w-full p-2 border border-gray-300 rounded-md"
                    {...register(`questions.${questionIndex}.answerType`)}>
                    <option value="single">Single Choice</option>
                    <option value="multiple">Multiple Choice</option>
                </select>
                {errors.questions?.[questionIndex]?.answerType &&
                    <p className="text-red-500">{errors.questions[questionIndex]?.answerType?.message}</p>}

            </div>

            <label className="block text-gray-700 font-medium mb-2">
                Answers
            </label>
            {answerFields.map((answerField, answerIndex) => (
                    <div key={answerField + questionIndex + answerIndex}
                         className="flex items-center space-x-4">
                        {watch(`questions.${questionIndex}.questionType`) === "text" ? (
                            <>
                                <input
                                    className="w-full p-2 border border-gray-300 rounded-md mb-4"
                                    {...register(`questions.${questionIndex}.answers.${answerIndex}`)}
                                    placeholder="Answer"/>
                                <Button type="button" disabled={answerIndex === 0}
                                        onClick={() => removeAnswer(answerIndex)}
                                        className="bg-red-500 text-white p-4 rounded-3xl mb-4">
                                    Remove Answer
                                </Button>
                            </>
                        ) : (
                            <div className="flex flex-col w-full items-center justify-center">
                                <input
                                    className="w-full p-2 border border-gray-300 rounded-md mb-4"
                                    {...register(`questions.${questionIndex}.answers.${answerIndex}`)}
                                    type="file"
                                    accept="image/*"
                                />

                                {watch(`questions.${questionIndex}.answers.${answerIndex}`) instanceof FileList && (
                                    <img
                                        className="rounded-2xl hover:scale-105 duration-300 ease-linear"
                                        src={URL.createObjectURL(watch(`questions.${questionIndex}.answers.${answerIndex}`)[0])}
                                        alt="Preview"/>
                                )}
                                <Button type="button" disabled={answerIndex === 0}
                                        onClick={() => removeAnswer(answerIndex)}
                                        className="bg-red-500 text-white font-semibold p-4 rounded-3xl m-4 max-w-[10rem] duration-300 hover:bg-red-600 hover:text-black ease-linear">
                                    Remove Answer
                                </Button>
                            </div>
                        )}
                    </div>
                )
            )}
            {
                errors.questions?.[questionIndex]?.answers &&
                <p className="text-red-500">{errors.questions[questionIndex]?.answers?.message}</p>
            }
            <Button type="button" onClick={() => {
                console.log("I am clicking append answers");
                appendAnswer(" ")
            }}
                    className="bg-blue-500 text-white p-2 rounded-3xl hover:bg-orange-400 duration-300 ease-in drop-shadow">
                Add Answer
            </Button>

            {
                errors.questions?.[questionIndex]?.answers &&
                <p className="text-red-500">{errors.questions[questionIndex]?.answers?.message}</p>
            }

            <label>Correct Answer</label>
            {
                watch(`questions.${questionIndex}.answerType`) === "single" ? (
                    <select
                        className="w-full p-2 border-2 border-blue-500 rounded-lg shadow-sm text-gray-600 focus:outline-none focus:border-blue-700"
                        {...register(`questions.${questionIndex}.correctAnswer`)}
                    >
                        {answerFields.map((_, answerIndex) => (
                            <option key={answerIndex}
                                    value={answerIndex}
                                    className="p-1"
                            >
                                {`Answer ${answerIndex + 1}`}
                            </option>
                        ))}
                    </select>
                ) : (
                    answerFields.map((_, answerIndex) => (
                        <div key={answerIndex}
                             className="flex items-center space-x-4 p-4 bg-gray-300 rounded-lg shadow-lg">
                            <input
                                {...register(`questions.${questionIndex}.correctAnswers.${answerIndex}`)}
                                type="checkbox"
                                className="form-checkbox h-5 w-5 text-blue-600"/>
                            <label
                                className="ml-2 text-lg font-semibold text-gray-700"
                            >
                                Answer {answerIndex + 1}
                            </label>
                        </div>
                    ))
                )
            }
            {
                errors.questions?.[questionIndex]?.correctAnswers &&
                <p className="text-red-500">{errors.questions[questionIndex]?.correctAnswers?.message}</p>
            }

            <div className="mb-4">
                <label
                    className="block text-gray-700 font-medium mb-2"
                >Correct Message</label>
                <textarea
                    className="w-full p-2 border border-gray-300 rounded-md"
                    {...register(`questions.${questionIndex}.correctMessage`)}
                    placeholder="Correct Message"/>
                {errors.questions?.[questionIndex]?.correctMessage &&
                    <p>{errors.questions[questionIndex]?.correctMessage?.message}</p>}
            </div>

            <div className="mb-4">
                <label
                    className="block text-gray-700 font-medium mb-2"
                >Message For Wrong Answer</label>
                <textarea
                    className="w-full p-2 border border-gray-300 rounded-md"
                    {...register(`questions.${questionIndex}.wrongMessage`)}
                    placeholder="Wrong Message"/>
                {errors.questions?.[questionIndex]?.wrongMessage &&
                    <p className="text-red-500">{errors.questions[questionIndex]?.wrongMessage?.message}</p>}
            </div>

            <div className="mb-4">
                <label
                    className="block text-gray-700 font-medium mb-2"
                >Explanations</label>
                <textarea
                    className="w-full p-2 border border-gray-300 rounded-md"
                    {...register(`questions.${questionIndex}.explanation`)} placeholder="Explanation"/>
                {errors.questions?.[questionIndex]?.explanation &&
                    <p className="text-red-500">{errors.questions[questionIndex]?.explanation?.message}</p>}
            </div>

            <div className="mb-4">
                <label
                    className="block text-gray-700 font-medium mb-2">
                    Points
                </label>
                <input
                    className="w-full p-2 border border-gray-300 rounded-md"
                    {...register(`questions.${questionIndex}.points`, {
                        setValueAs: value => parseFloat(value)
                    })}
                    type="number" placeholder="Points"/>
                {errors.questions?.[questionIndex]?.points &&
                    <p className="text-red-500">{errors.questions[questionIndex]?.points?.message}</p>}
            </div>
            <Button
                className="rounded-full bg-red-400 hover:bg-red-500 font-semibold hover:text-black duration-300 ease-in drop-shadow shadow-red-400 shadow-2xl"
                type="button" disabled={questionIndex === 0} onClick={() => {
                removeQuestion(questionIndex)
            }}>Remove Question</Button>
        </div>
    );
}