import { Dispatch, SetStateAction } from "react";
import { TeamType } from "./TeamsTyps";

export interface UserContextType {
	username: string | undefined;
	setUserName: Dispatch<SetStateAction<string | undefined>>;
	teams: TeamType[];
	setTeams: Dispatch<SetStateAction<TeamType[]>>;
}
