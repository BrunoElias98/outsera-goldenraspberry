export interface Movie {
  id: number;
  year: number;
  title: string;
  studios: string[];
  producers: string[];
  winner: boolean;
}

export interface PaginatedMoviesResponse {
  content: Movie[];
  totalPages: number;
}

export interface MultipleWinner {
  year: number;
  winnerCount: number;
}

export interface MultipleWinnersResponse {
  years: MultipleWinner[];
}

export interface TopStudios {
  name: number;
  winCount: number;
}

export interface TopStudiosResponse {
  studios: TopStudios[];
}

export interface ProducerInterval {
  producer: string;
  interval: number;
  previousWin: number;
  followingWin: number;
}

export interface ProducersResponse {
  min: ProducerInterval[];
  max: ProducerInterval[];
}