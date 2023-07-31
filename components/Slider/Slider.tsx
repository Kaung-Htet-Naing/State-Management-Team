import React, { useEffect, useState } from "react";
import SlideOver from "./SlideOver/SliderOver";
import { PlusCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { TeamType } from "@/types/TeamsTyps";
import { v4 as uuidv4 } from "uuid";

type SliderProps = {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	team?: TeamType;
	teams: TeamType[];
	handleCreateNewTeam?: (newTeam: TeamType) => void;
	handleUpdateTeam?: (newTeam: TeamType) => void;
	type: "create" | "update";
};

const Slider = ({
	open,
	setOpen,
	handleCreateNewTeam,
	team,
	handleUpdateTeam,
	type,
	teams,
}: SliderProps) => {
	const [name, setName] = useState<string>("");
	const [playerCount, setPlayerCount] = useState<number>(0);
	const [region, setRegion] = useState<string>("");
	const [country, setCountry] = useState<string>("");
	const [player, setPlayer] = useState<string>("");
	const [players, setPlayers] = useState<string[]>([]);
	const [nameError, setNameError] = useState<string>("");
	const [regionError, setRegionError] = useState<string>("");
	const [countryError, setCountryError] = useState<string>("");
	const [playerError, setPlayerError] = useState<string>("");

	useEffect(() => {
		if (type == "update" && team) {
			setName(team.name);
			setPlayerCount(team.playerCount);
			setRegion(team.region);
			setCountry(team.country);
			setPlayers(team.players);
		}
	}, [team]);

	const checkValidation = () => {
		const isUniqueName = teams.some((team) => team.name === name);
		if (name.length <= 0) {
			setNameError("Type Name");
		} else setNameError("");
		if (isUniqueName) {
			setNameError("Already exists");
		}
		if (region.length <= 0) {
			setRegionError("Type Region");
		} else setRegionError("");
		if (country.length <= 0) {
			setCountryError("Type Country");
		} else setCountryError("");
		const isValidInput =
			name.length > 0 && region.length > 0 && country.length > 0;
		return isValidInput && !isUniqueName;
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const check = checkValidation();
		if (check) {
			if (type == "create") {
				const newTeam = {
					id: parseInt(uuidv4()),
					name,
					playerCount,
					region,
					country,
					players,
				};
				if (handleCreateNewTeam) {
					handleCreateNewTeam(newTeam);
				}
			}
			if (type == "update" && team) {
				const updateTeam = {
					id: team.id,
					name,
					playerCount,
					region,
					country,
					players,
				};
				if (handleUpdateTeam) handleUpdateTeam(updateTeam);
			}
			setNameError("");
			setRegionError("");
			setCountryError("");
		}
	};

	const handleRemovePlayer = (playerToRemove: string) => {
		setPlayers((prevPlayers) => {
			return prevPlayers.filter((player) => player !== playerToRemove);
		});
	};

	const handleAddPlayer = () => {
		const playerExists = teams.some((team) => team.players.includes(player));
		const playerExistsInSameTeam = players.includes(player);
		console.log("playerExists", playerExists);
		console.log("playerExistsInSameTeam", playerExistsInSameTeam);
		if (player.length > 0) {
			if (playerExists || playerExistsInSameTeam) {
				setPlayerError("Duplicate players found");
				return;
			} else {
				setPlayers((prevPlayers) => {
					return [...prevPlayers, player];
				});
				setPlayer("");
				setPlayerError("");
			}
		}
	};

	return (
		<SlideOver open={open} setOpen={setOpen}>
			<div className="flex flex-col h-full py-6 overflow-y-scroll ">
				<div className="px-5 py-8 sm:px-6">
					<div className="flex items-center justify-between">
						<p className="text-xl font-semibold leading-6 text-gray-900 capitalize ">
							{type} Team
						</p>
						<div className="flex items-center ml-3 h-7">
							<button
								type="button"
								className="text-gray-400 bg-white rounded-md hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
								onClick={() => setOpen(false)}
							>
								<span className="sr-only">Close panel</span>
								<XMarkIcon className="w-6 h-6" aria-hidden="true" />
							</button>
						</div>
					</div>
				</div>
				<form onSubmit={(event) => handleSubmit(event)}>
					<div className="relative flex-1 px-4 mt-6 sm:px-6">
						<div>
							<label
								htmlFor="name"
								className="block text-sm font-medium leading-6 text-gray-600"
							>
								Name <span className="text-red-400">*</span>
							</label>
							<input
								value={name}
								onChange={(e) => setName(e.target.value)}
								className="block w-full px-3 py-3 placeholder-gray-400 rounded-md shadow-sm appearance-none bg-secondary-gray sm:text-sm"
								id="name"
								placeholder="Mancheaster United"
							/>
							{nameError.length > 0 && (
								<p className="m-1 text-sm text-red-900">{nameError}</p>
							)}
						</div>
						<div>
							<label
								htmlFor="Region"
								className="block text-sm font-medium leading-6 text-gray-600"
							>
								Player Count <span className="text-red-400">*</span>
							</label>
							<input
								value={playerCount}
								onChange={(e) => setPlayerCount(parseInt(e.target.value))}
								className="block w-full px-3 py-3 placeholder-gray-400 rounded-md shadow-sm appearance-none bg-secondary-gray sm:text-sm"
								id="player-count"
								type="number"
							/>
						</div>
						<div>
							<label
								htmlFor="Region"
								className="block text-sm font-medium leading-6 text-gray-600"
							>
								Region <span className="text-red-400">*</span>
							</label>
							<input
								value={region}
								onChange={(e) => setRegion(e.target.value)}
								className="block w-full px-3 py-3 placeholder-gray-400 rounded-md shadow-sm appearance-none bg-secondary-gray sm:text-sm"
								id="region"
								placeholder="asia"
							/>
							{regionError.length > 0 && (
								<p className="m-1 text-sm text-red-900">{regionError}</p>
							)}
						</div>
						<div>
							<label
								htmlFor="Country"
								className="block text-sm font-medium leading-6 text-gray-600"
							>
								Country <span className="text-red-400">*</span>
							</label>
							<input
								value={country}
								onChange={(e) => setCountry(e.target.value)}
								className="block w-full px-3 py-3 placeholder-gray-400 rounded-md shadow-sm appearance-none bg-secondary-gray sm:text-sm"
								id="country"
								placeholder="myanmar"
							/>
							{countryError.length > 0 && (
								<p className="m-1 text-sm text-red-900">{countryError}</p>
							)}
						</div>
						<div className="mt-5">
							<label
								htmlFor="players"
								className="block text-sm font-medium leading-6 text-gray-600 "
							>
								<p className="pb-2">
									Players <span className="text-red-400">*</span>
								</p>
								<div className="block w-full px-3 py-3 placeholder-gray-400 bg-white rounded-md shadow-sm appearance-none bg-secondary-gray sm:text-sm">
									<div className="flex flex-wrap mt-2 gap-x-3 gap-y-1">
										{players.map((player: string, idx: number) => (
											<div className="flex " key={idx}>
												<p className="flex items-center gap-2 px-2 py-1 text-sm text-black bg-gray-300 rounded-full">
													{player}
													<span
														onClick={() => handleRemovePlayer(player)}
														className="cursor-pointer"
													>
														<XMarkIcon className="w-3 h-3" aria-hidden="true" />
													</span>
												</p>
											</div>
										))}
									</div>
									<div className="flex items-end">
										<input
											value={player}
											onChange={(e) => setPlayer(e.target.value)}
											id="player"
											className="block w-full mt-5 placeholder-gray-400 outline-none appearance-none bg-secondary-gray sm:text-sm"
										/>
										{player.length > 0 && (
											<p className="text-xs text-gray-600">
												Please Press Add Icon
											</p>
										)}
										<div onClick={handleAddPlayer} className="cursor-pointer">
											<PlusCircleIcon className="w-8 h-8" />
										</div>
									</div>
									{playerError.length > 0 && (
										<p className="m-1 text-sm text-red-900">{playerError}</p>
									)}
								</div>
							</label>
						</div>
					</div>
					<div className="flex justify-end gap-3 px-5">
						<button
							onClick={() => {
								setOpen(false);
							}}
							type="button"
							className="px-5 py-2 mt-5 text-sm text-gray-600 capitalize transition-colors duration-200 bg-white border rounded-lg sm:w-auto"
						>
							Cancel
						</button>
						<button
							type="submit"
							className="px-5 py-2 mt-5 text-sm text-white capitalize transition-colors duration-200 bg-black border rounded-lg disabled:bg-gray-400 sm:w-auto"
						>
							{type}
						</button>
					</div>
				</form>
			</div>
		</SlideOver>
	);
};

export default Slider;
