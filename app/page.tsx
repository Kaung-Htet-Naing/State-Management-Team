"use client";
import { UserContext } from "@/ContextProvider/ContextProvider";
import { PlayerTable, TeamsTable } from "@/components";
import PlayerType from "@/types/PlayerType";
import { UserContextType } from "@/types/UserContextType";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

type Tab = {
	name: string;
	current: boolean;
};
function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(" ");
}

export default function Home() {
	const { username, teams, setTeams } =
		useContext<UserContextType>(UserContext);
	const [players, setPlayers] = useState<PlayerType[]>([]);
	const router = useRouter();
	const [page, setPage] = useState(1);
	const [tabs, setTabs] = useState<Tab[]>([
		{ name: "Players", current: true },
		{ name: "Teams", current: false },
	]);

	const fetchPlayers = async () => {
		try {
			const response = await fetch(
				`https://www.balldontlie.io/api/v1/players?page=${page}&per_page=10`
			);
			const data = await response.json();
			const newPlayers = data.data;
			setPlayers((prevPlayers) => {
				return [...prevPlayers, ...newPlayers];
			});
		} catch (error) {
			console.error("Error fetching players:", error);
		}
	};

	useEffect(() => {
		fetchPlayers();
	}, [page]);

	const handleLogout = () => {
		fetch("/api/logout", {
			method: "POST",
		})
			.then(() => router.push("/login"))
			.catch((error) => console.log(error));
	};

	const handleLoadMore = () => {
		setPage((prevPage) => prevPage + 1);
		fetchPlayers();
	};

	const handleClick = (clickedTab: Tab) => {
		const updatedTabs = tabs.map((tab) =>
			tab === clickedTab
				? { ...tab, current: true }
				: { ...tab, current: false }
		);
		setTabs(updatedTabs);
	};

	if (players && players?.length <= 0)
		return (
			<div className="flex items-center justify-center h-screen bg-gray-100">
				<p className="text-3xl">Loading...</p>
			</div>
		);

	return (
		<>
			<div className="">
				{username && (
					<div className="flex justify-between px-10 h-[100px] items-center bg-slate-300">
						<p className="text-2xl text-black"> {username}</p>
						<button
							type="submit"
							className="px-4 py-1 text-sm text-white bg-blue-500 rounded-md cursor-pointer "
							onClick={handleLogout}
						>
							Logout
						</button>
					</div>
				)}
				<div className="px-4 n sm:px-6 lg:px-8">
					<div className="border-b border-gray-200">
						<nav className="flex -mb-px space-x-8" aria-label="Tabs">
							{tabs.map((tab) => (
								<p
									key={tab.name}
									className={classNames(
										tab.current
											? "border-indigo-500 text-indigo-600"
											: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
										"whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium cursor-pointer"
									)}
									aria-current={tab.current ? "page" : undefined}
									onClick={() => handleClick(tab)}
								>
									{tab.name}
								</p>
							))}
						</nav>
					</div>

					{tabs[0].current && (
						<PlayerTable players={players} handleLoadMore={handleLoadMore} />
					)}
					{tabs[1].current && <TeamsTable teams={teams} setTeams={setTeams} />}
				</div>
			</div>
		</>
	);
}
