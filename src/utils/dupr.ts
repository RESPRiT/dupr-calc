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
    ratings.length == 2 ? youRating - oppRating : (youRating - oppRating) / 2;

  const results: MarginResults = {
    winner: ratingDiff > 0 ? "Your" : "Opp.",
    higherScore: playedTo,
    lowerScore: Math.floor(playedTo * (1 - Math.min(Math.abs(ratingDiff), 1))),
  };

  return results;
}

/*
The following is an incomplete implementation of an authentic Elo
expected score calculation. The problem is that DUPR's behavior
doesn't match what is possible under an authentic Elo calculation:

You can't have a 0.5 per player point difference map to 11-5.5,
and also have a 1.0 per player point difference map to 11-0 -
no logistic curve satisfies that. So, something is being
truncated to achieve this, which is bizarre.
If you use sensible values - base 10 logistic curve and have
a scale where 0.5 difference = 11-5.5, the expected score for
a 1.0 difference is 11-2(ish). That's pretty reasonable, so
I wonder why they are insistent on having a 1.0 difference be
an expected score of 11-0 -- I think?

An example match where that was the case:
- Difference per player: 0.887
- "Elo" expected result: 11-2(ish)
- DUPR expected result: 11-1
- Actual result: 11-2 -> (very minor) rating loss
*/

/*
export function calculateMargin(
  ratings: Array<number>,
  playedTo: number,
): MarginResults {
  const youRating =
    ratings.length == 2 ? ratings[0] : (ratings[0] + ratings[1]) / 2;
  const oppRating =
    ratings.length == 2 ? ratings[1] : (ratings[2] + ratings[3]) / 2;
  const ratingDiff = Math.abs(youRating - oppRating);
  const advantageCurve = 10; // follow a logistic curve with base _
  const differenceScale = 0.5; // when the difference is _
  const expectedLower =
    1 / (1 + Math.pow(advantageCurve, ratingDiff / (differenceScale * 2)));
  const normalizedLower = expectedLower * 2;

  const results: MarginResults = {
    winner: youRating > oppRating ? "Your" : "Opp.",
    higherScore: playedTo,
    lowerScore: Math.floor(playedTo * normalizedLower),
  };

  return results;
}
*/
