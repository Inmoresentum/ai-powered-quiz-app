import {AutoGrid} from "@hilla/react-crud";
import {LeaderboardEndpoint} from "@/generated/endpoints";
import GlobalLeaderBoardModel from "@/generated/com/example/application/entities/leaderboard/GlobalLeaderBoardModel";

export default function Leaderboard() {

    return (
        <>
            <AutoGrid service={LeaderboardEndpoint} model={GlobalLeaderBoardModel} className="m-2 md:mx-20"/>
        </>
    );
}