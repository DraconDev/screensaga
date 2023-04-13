export type Movie = {
	id: number;
	title: string;
	poster_path: string;
	vote_average: number;
	// genre_ids: number[];
	[key: string]: any;
};

export type Genres = {
	id: number;
	name: string;
};
