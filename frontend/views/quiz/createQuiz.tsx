import React from "react";
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
    const {register, handleSubmit, control, watch, formState: {errors}} = useForm<QuizCreatorSchemaType>({
        resolver: zodResolver(quizCreatorSchema),
        defaultValues: {
            quizTitle: "",
            quizSynopsis: "",
            quizTags: "SCIENCE",
            difficulty: "EASY",
            questions: [{answers: [], answerType: "single", correctAnswers: [], correctMessage: "", wrongMessage: "", explanation: "", points: 0.0, title: ""}]
        }
    });

    const {fields: questionFields, append: appendQuestion, remove: removeQuestion} = useFieldArray({
        control,
        name: "questions"
    });

    const onSubmit = (data: QuizCreatorSchemaType) => {
        console.log(data);
    };

    return (
        <div className="flex justify-center items-center pt-24 pb-10">
            <form onSubmit={handleSubmit(onSubmit)}
                  className="p-14 bg-gray-100 rounded-2xl shadow-2xl max-w-[680px] w-full hover:bg-white duration-300 ease-linear flex flex-col">

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

                <div className="mb-4" key="quizSynopsis">
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
                    {/*todo: add the image preview*/}
                </div>

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
                        {/*todo: add option according to the backend*/}
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

                {questionFields.map((questionField, questionIndex) => {
                    // @ts-ignore
                    return <Question key={questionIndex + Math.random() + "ignorealkdjfksdjf"} control={control} questionField={questionField} questionIndex={questionIndex} removeQuestion={removeQuestion} errors={errors} register={register} watch={watch}/>
                })}

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

                <Button type="submit" className="mt-2 rounded-full">Submit</Button>
            </form>
        </div>
    );
};

export default CreateQuiz;

type QuestionProp = {
    control: Control<QuizCreatorSchemaType, any>,
    questionIndex: number
    questionField:  FieldArrayWithId<{} | ((formValues: QuizCreatorSchemaType) => QuizCreatorSchemaType) | QuizCreatorSchemaType, string, "id">,
    register: UseFormRegister<FieldValues>
    errors: Partial<FieldErrorsImpl<DeepRequired<QuizCreatorSchemaType>>> & {
        root?: Record<string, GlobalError> & GlobalError
    },
    watch: UseFormWatch<QuizCreatorSchemaType>,
    removeQuestion: UseFieldArrayRemove,
}

export function Question({control, questionIndex, questionField, register, errors, watch, removeQuestion}: QuestionProp) {
    const {fields: answerFields, append: appendAnswer, remove: removeAnswer} = useFieldArray({
        control,
        name: `questions.${questionIndex}.answers`
    });
    return (
        <div key={questionField.id + questionIndex + "sometop"} className="flex flex-col space-y-4">
            <label>Question Title</label>
            <input {...register(`questions.${questionIndex}.title`)} placeholder="Question Title"
                   className="border p-2 rounded"/>
            {errors.questions && errors.questions[questionIndex]?.title?.message &&
                <p className="text-red-500">{errors.questions[questionIndex]?.title?.message}</p>}

            <label className="font-bold">Question Type</label>
            <select {...register(`questions.${questionIndex}.questionType`)}>
                <option value="text">Text</option>
                <option value="image">Image</option>
            </select>
            {errors.questions?.[questionIndex]?.type &&
                <p>{errors.questions[questionIndex]?.questionType?.message}</p>}

            <label>Answer Type</label>
            <select {...register(`questions.${questionIndex}.answerType`)}>
                <option value="single">Single Choice</option>
                <option value="multiple">Multiple Choice</option>
            </select>
            {errors.questions?.[questionIndex]?.answerType &&
                <p>{errors.questions[questionIndex]?.answerType?.message}</p>}

            <label>Answers</label>
            {answerFields.map((answerField, answerIndex) => (
                <div key={answerField + questionIndex + answerIndex}
                     className="flex items-center space-x-4">
                    {watch(`questions.${questionIndex}.questionType`) === "text" ? (
                        <input {...register(`questions.${questionIndex}.answers.${answerIndex}`)}
                               placeholder="Answer" className="border p-2 rounded"/>
                    ) : (
                        <input {...register(`questions.${questionIndex}.answers.${answerIndex}`)}
                               type="file"
                               className="border p-2 rounded"/>
                    )}
                    <Button type="button" disabled={answerIndex === 0}
                            onClick={() => removeAnswer(answerIndex)}
                            className="bg-red-500 text-white p-2 rounded">Remove Answer
                    </Button>
                </div>
            ))}
            {errors.questions?.[questionIndex]?.answers &&
                <p className="text-red-500">{errors.questions[questionIndex]?.answers?.message}</p>}
            <Button type="button" onClick={() => {
                console.log("I am clicking append answers and its not working");
                appendAnswer(" ")
            }}
                    className="bg-blue-500 text-white p-2 rounded">
                Add Answer
            </Button>

            {errors.questions?.[questionIndex]?.answers &&
                <p>{errors.questions[questionIndex]?.answers?.message}</p>}

            <label>Correct Answer</label>
            {watch(`questions.${questionIndex}.answerType`) === "single" ? (
                <select {...register(`questions.${questionIndex}.correctAnswer`)}
                        className="border p-2 rounded">
                    {answerFields.map((_, answerIndex) => (
                        <option key={answerIndex}
                                value={answerIndex}>{`Answer ${answerIndex + 1}`}</option>
                    ))}
                </select>
            ) : (
                answerFields.map((_, answerIndex) => (
                    <div key={answerIndex} className="flex items-center space-x-4">
                        <input {...register(`questions.${questionIndex}.correctAnswers.${answerIndex}`)}
                               type="checkbox"/>
                        <label>{`Answer ${answerIndex + 1}`}</label>
                    </div>
                ))
            )}
            {errors.questions?.[questionIndex]?.correctAnswers &&
                <p className="text-red-500">{errors.questions[questionIndex]?.correctAnswers?.message}</p>}

            <label>Correct Message</label>
            <input {...register(`questions.${questionIndex}.correctMessage`)}
                   placeholder="Correct Message"/>
            {errors.questions?.[questionIndex]?.correctMessage &&
                <p>{errors.questions[questionIndex]?.correctMessage?.message}</p>}

            <label>Wrong Message</label>
            <input {...register(`questions.${questionIndex}.wrongMessage`)}
                   placeholder="Wrong Message"/>
            {errors.questions?.[questionIndex]?.wrongMessage &&
                <p>{errors.questions[questionIndex]?.wrongMessage?.message}</p>}

            <label>Explanation</label>
            <input {...register(`questions.${questionIndex}.explanation`)} placeholder="Explanation"/>
            {errors.questions?.[questionIndex]?.explanation &&
                <p>{errors.questions[questionIndex]?.explanation?.message}</p>}

            <label>Points</label>
            <input {...register(`questions.${questionIndex}.points`, {
                setValueAs: value => parseFloat(value)
            })}
                   type="number" placeholder="Points"/>
            {errors.questions?.[questionIndex]?.points &&
                <p>{errors.questions[questionIndex]?.points?.message}</p>}

            <Button className="rounded-full bg-red-400" type="button" disabled={questionIndex === 0} onClick={() => {
                removeQuestion(questionIndex)
            }}>Remove Question</Button>
        </div>
    );
}