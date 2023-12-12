import {Link} from "react-router-dom";
import {Atom, IterationCcw, UserCog} from "lucide-react";
import applogo from "../../../../src/main/resources/META-INF/resources/images/ai_quiz_logo.png"
import React from "react";
import Quiz from "@/generated/com/example/application/entities/quiz/Quiz";

type QuizProps = {
    quiz: Quiz
}
export default function QuizCard({quiz}: QuizProps) {
    console.log(quiz);
    console.log(quiz.quizProfilePhotoUrl);
    return (
        <Link to={`http://localhost:8080/quiz/play/${quiz.quizId}`}>
            <div className="quiz-card">
                <IterationCcw className="bi text-white whatever mix-blend-difference"/>
                <div className="quiz-card-top">
                    <img src={quiz.quizProfilePhotoUrl !== null ? quiz.quizProfilePhotoUrl : applogo} className="object-fill" alt=""
                         width="250" height="250"
                    />
                </div>

                <div className="quiz-card-body">
                    <h4 className="title">
                        {quiz?.quizTitle ? quiz?.quizTitle : "SOME VERY COOL TEXT HERE IS GOING"}
                    </h4>
                    <p>
                        {quiz?.quizSynopsis ? quiz?.quizSynopsis :
                            "Whatever the hell that you thinking is correct brother"}
                    </p>

                    <div className="skills-box">
                        <div className="skill">
                            <IterationCcw className="bi math"/>
                            <span className="text">
                            <span>Math</span>
                            <span>General</span>
                        </span>
                        </div>
                        <div className="skill">
                            <Atom className="bi physics"/>
                            <span className="text">
                            <span>Physics</span>
                            <span>High School</span>
                        </span>
                        </div>
                        <div className="skill">
                            <UserCog className="bi physics"/>
                            <span className="text">
                                    <span>BY</span>
                                    <span>{quiz?.createdBy?.username}</span>
                                </span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}