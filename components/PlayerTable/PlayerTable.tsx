import PlayerType from "@/types/PlayerType";
import React from "react";

type PlayerTableProps = {
	players: PlayerType[];
	handleLoadMore: () => void;
};

const PlayerTable = ({ players, handleLoadMore }: PlayerTableProps) => {
	return (
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
									Full Name
								</th>
								<th
									scope="col"
									className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
								>
									Height
								</th>
								<th
									scope="col"
									className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
								>
									Position
								</th>
								<th
									scope="col"
									className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
								>
									Weight
								</th>
								<th
									scope="col"
									className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
								>
									Team Name
								</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-200">
							{players &&
								players.map((player: PlayerType) => (
									<tr key={player.id}>
										<td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 whitespace-nowrap sm:pl-0">
											{player.first_name} {player.last_name}
										</td>
										<td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
											{player.height_feet ? `${player.height_feet}'` : ""}
											{player.height_inches
												? `${player.height_inches}''`
												: "empty"}
										</td>
										<td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
											{player.position ? player.position : "empty"}
										</td>
										<td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
											{player.weight_pounds ? player.weight_pounds : "empty"}
										</td>
										<td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
											{player.team.full_name ? player.team.full_name : "Free"}
										</td>
									</tr>
								))}
						</tbody>
					</table>
					<div
						className="flex justify-end w-full cursor-pointer"
						onClick={handleLoadMore}
					>
						<p className="p-2 text-xs text-white bg-indigo-600 rounded-md hover:bg-indigo-500">
							Load More...
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PlayerTable;
