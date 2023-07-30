"use client";
import { UserContextType } from "@/types/UserContextType";
import { ReactNode, createContext, useEffect, useState } from "react";
import data from "@/data/teams.json";

export const UserContext = createContext<UserContextType>({
	username: undefined,
	setUserName: () => {},
	teams: [],
	setTeams: () => {},
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [username, setUserName] = useState<string | undefined>();
	const [teams, setTeams] = useState<UserContextType["teams"]>(data);

	useEffect(() => {
		const token = sessionStorage.getItem("username");
		const sessionTeams = sessionStorage.getItem("teams");
		if (token) setUserName(token);
		if (sessionTeams) setTeams(JSON.parse(sessionTeams));
	}, []);

	return (
		<UserContext.Provider value={{ username, setUserName, teams, setTeams }}>
			{children}
		</UserContext.Provider>
	);
};

export default AuthProvider;
