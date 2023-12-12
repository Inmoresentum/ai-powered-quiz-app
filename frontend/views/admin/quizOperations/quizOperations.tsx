import {QuizAdminEndpoint} from "@/generated/endpoints";
import QuizModel from "@/generated/com/example/application/entities/quiz/QuizModel";
import {AutoCrud} from "@hilla/react-crud";

export default function QuizOperations() {
    return (
        <div className="flex items-center justify-center h-[1080px] w-full">
            <AutoCrud service={QuizAdminEndpoint} model={QuizModel}
                      className="h-full shadow-2xl rounded-md max-w-[1280px] w-full"/>
        </div>
    );
}