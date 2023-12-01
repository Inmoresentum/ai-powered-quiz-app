import {z} from "zod";

const MAX_FILE_SIZE: number = 500000;
const ACCEPTED_IMAGE_TYPES: string[] = ["image/jpeg", "image/jpg", "image/png", "image/webp",];

const schema = z.object({
    quizTitle: z.string()
        .min(3, {message: "Quiz title is required & Quiz title must be at least 3 characters long"}),
    quizSynopsis: z.string()
        .min(10, {message: "Quiz synopsis is required & Quiz synopsis must be at least 10 characters long"}),
    quizProfileImage: z
        .any()
        .refine((files) => files?.length == 1, "Image is required.")
        .refine(
            (files) => files?.[0]?.size <= MAX_FILE_SIZE,
            `Max file size is 5MB.`
        )
        .refine(
            (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
            ".jpg, .jpeg, .png and .webp files are accepted."
        ),
    quizTags: z.enum(["Something", "another something", "gg"]),
    difficulty: z.enum(["EASY", "MODERATE", "DIFFICULT", "CRAZY"]),
    questions: z.array(
        z.object({
            title: z.string().min(1, {message: "Question title is required"}),
            type: z.string().min(1, {message: "Question type is required"}),
            answers: z.array(z.any()).nonempty({message: "At least one answer is required"}),
            answerType: z.string().min(1, {message: "Answer type is required"}),
            correctAnswer: z.any(),
            correctAnswers: z.array(z.boolean()),
            correctMessage: z.string().min(1, {message: "Message for correct answer is required"}),
            wrongMessage: z.string().min(1, {message: "Message for wrong answer is required"}),
            explanation: z.string().min(1, {message: "Explanation is required"}),
            points: z.number().positive({message: "Points must be a positive number"})
        })
    ).nonempty({message: "At least one question is required"})
});

export default function CreateQuiz() {

    return (
        <>
            <div className="flex items-center justify-center">
                <h1>
                    This where the form will go as you can tell by that
                </h1>
            </div>
        </>
    );
}