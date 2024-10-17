type Movie = {
  year: number;
  title: string;
  studios: string[];
  producers: string[];
  winner: boolean;
};

export const generateMovies = (
  firstMovieWinner: boolean,
  secondMovieWinner: boolean
): Movie[] => {
  return [
    {
      year: 1990,
      title: "Bad Movie 1",
      studios: ["Studio A"],
      producers: ["Producer A"],
      winner: firstMovieWinner,
    },
    {
      year: 1991,
      title: "Bad Movie 2",
      studios: ["Studio B"],
      producers: ["Producer B"],
      winner: secondMovieWinner,
    },
  ];
};
