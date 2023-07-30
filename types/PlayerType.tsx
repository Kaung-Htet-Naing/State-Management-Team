export interface Team {
	id: number;
	abbreviation: string;
	city: string;
	conference: string;
	division: string;
	full_name: string;
	name: string;
}

export default interface PlayerType {
	id: number;
	first_name: string;
	height_feet: number | null;
	height_inches: number | null;
	last_name: string;
	position: string;
	team: Team;
	weight_pounds: number | null;
}
