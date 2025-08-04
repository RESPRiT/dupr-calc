export type MarginResults = {
  winner: "Your" | "Opp.";
  higherScore: number;
  lowerScore: number;
};

export function calculateMargin(
  ratings: Array<number>,
  playedTo: number,
): MarginResults {
  const youRating = ratings.length == 2 ? ratings[0] : ratings[0] + ratings[1];
  const oppRating = ratings.length == 2 ? ratings[1] : ratings[2] + ratings[3];
  const ratingDiff =
    ratings.length == 2 ? (youRating - oppRating) * 2 : youRating - oppRating;

  const results: MarginResults = {
    winner: ratingDiff > 0 ? "Your" : "Opp.",
    higherScore: playedTo,
    lowerScore: Math.floor(
      playedTo * (1 - Math.min(Math.max(Math.abs(ratingDiff), 0), 2) / 2),
    ),
  };

  return results;
}
