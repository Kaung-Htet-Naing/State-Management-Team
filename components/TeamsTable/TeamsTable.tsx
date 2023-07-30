import { TeamType } from "@/types/TeamsTyps";
import React, { useState } from "react";
import Slider from "../Slider/Slider";

type PlayerTableProps = {
	teams: TeamType[];
	setTeams: React.Dispatch<React.SetStateAction<TeamType[]>>;
};

const TeamsTable = ({ teams, setTeams }: PlayerTableProps) => {
	const [createSlide, setCreateSlide] = useState<boolean>(false);
	const [updateSlide, setUpdateSlide] = useState<boolean>(false);
	const [team, setTeam] = useState<TeamType>();

	const handleCreateNewTeam = (newTeam: TeamType) => {
		setCreateSlide((prev) => !prev);
		setTeams((prev) => [...prev, newTeam]);
		sessionStorage.setItem("teams", JSON.stringify([...teams, newTeam]));
	};

	const handleEditTeam = (team: TeamType) => {
		setTeam(team);
		setUpdateSlide((prev) => !prev);
	};

	const handleDelteTeam = (id: number) => {
		setTeams((prevTeams) => prevTeams.filter((team) => team.id !== id));
		const updatedTeams = teams.filter((team) => team.id !== id);
		sessionStorage.setItem("teams", JSON.stringify(updatedTeams));
	};

	const handleUpdateTeam = (updatedTeam: TeamType) => {
		setTeams((prevTeams) => {
			const teamIndex = prevTeams.findIndex(
				(team) => team.id === updatedTeam.id
			);

			if (teamIndex !== -1) {
				const updatedTeams = [...prevTeams];
				updatedTeams[teamIndex] = updatedTeam;
				return updatedTeams;
			}
			return prevTeams;
		});
		setUpdateSlide((prev) => !prev);
		sessionStorage.setItem("teams", JSON.stringify([...teams, updatedTeam]));
	};

	return (
		<>
			<Slider
				open={createSlide}
				setOpen={setCreateSlide}
				handleCreateNewTeam={handleCreateNewTeam}
				teams={teams}
				type="create"
			/>
			<Slider
				open={updateSlide}
				setOpen={setUpdateSlide}
				team={team}
				teams={teams}
				handleUpdateTeam={handleUpdateTeam}
				type="update"
			/>
			<div className="flow-root mt-8">
				<div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
					<div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
						<table className="min-w-full divide-y divide-gray-300">
							<thead>
								<tr>
									<th
										scope="col"
										className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
									>
										Name
									</th>
									<th
										scope="col"
										className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
									>
										Player Count
									</th>
									<th
										scope="col"
										className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
									>
										Region
									</th>
									<th
										scope="col"
										className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
									>
										Country
									</th>
									<th
										scope="col"
										className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
									>
										Players
									</th>
									<th
										scope="col"
										className="px-3 py-3.5  cursor-pointer text-sm font-semibold text-indigo-600  text-center"
										onClick={() => {
											setCreateSlide((prev) => !prev);
										}}
									>
										Create New Team
									</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-gray-200">
								{teams &&
									teams.map((team: TeamType) => (
										<tr key={team.id}>
											<td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 whitespace-nowrap sm:pl-0">
												{team.name}
											</td>
											<td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
												{team.playerCount}
											</td>
											<td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
												{team.region}
											</td>
											<td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
												{team.country}
											</td>
											<td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
												{team.players.length > 0
													? `${team.players.slice(0, 3).join(", ")}${
															team.players.length > 3
																? ` ... ${team.players.length - 3} more`
																: ""
													  }`
													: "none"}
											</td>
											<td className="relative flex justify-around py-4 pl-3 pr-4 text-sm font-medium text-right whitespace-nowrap sm:pr-0">
												<a
													href="#"
													className="text-red-600 hover:text-red-900"
													onClick={() => handleDelteTeam(team.id)}
												>
													Delete
												</a>
												<a
													href="#"
													className="text-indigo-600 hover:text-indigo-900"
													onClick={() => handleEditTeam(team)}
												>
													Edit
												</a>
											</td>
										</tr>
									))}
							</tbody>
						</table>
						{/* 	<div
							className="flex justify-end w-full cursor-pointer"
							onClick={handleLoadMore}
						>
							<p className="p-2 text-xs text-white bg-indigo-600 rounded-md hover:bg-indigo-500">
								Load More...
							</p>
						</div> */}
					</div>
				</div>
			</div>
		</>
	);
};

export default TeamsTable;
