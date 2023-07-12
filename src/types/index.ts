export type Character = {
	id: Number;
	name: string;
	status: string;
	species: string;
	type: string;
	gender: string;
	origin: {
		name: string;
		url: string;
	};
	location: {
		name: string;
		url: string;
	};
	image: string;
	episode: [string];
	url: string;
	created: string;
	isFavorite?: boolean;
};

export type CharactersApiReturn = {
	characters: Character[];
	nextPage: Number;
};
