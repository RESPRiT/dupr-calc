export type MarginResults = {
  winner: "Your" | "Opp.";
  higherScore: number;
  lowerScore: number;
};

/*
This works surprisingly well, even if it's not actually sound,
because CDF look very linear around the middle!
*/
export function calculateMarginLinear(
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
    lowerScore: Math.round(
      playedTo * (1 - Math.min(Math.abs(ratingDiff) + 0.0001, 1)),
    ),
  };

  return results;
}

/*
EDIT: The below comment made some incorrect assumptions about DUPR's
expected win curve, but I'll leave it for posterity. Basically, I
misread some data lol

---

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

export function calculateMargin(
  ratings: Array<number>,
  playedTo: number,
): MarginResults {
  const youRating =
    ratings.length == 2 ? ratings[0] : (ratings[0] + ratings[1]) / 2;
  const oppRating =
    ratings.length == 2 ? ratings[1] : (ratings[2] + ratings[3]) / 2;
  const ratingDiff = Math.abs(youRating - oppRating);
  /*
    We know the below numbers are right (as right as they can be for a
    logistic function), because we know that the expected win curve must
    intersect two points:
    - E(0)   = 11-11
    - E(0.5) = 11-5.5

    The former is obvious, the latter is based on statements from this
    interview (around 33:37): https://www.youtube.com/watch?v=BsDnXxDEAJg
  */
  const advantageCurve = 9; // follow a logistic curve with base _
  const differenceScale = 0.5; // when the difference is _
  const expectedLower =
    1 / (1 + Math.pow(advantageCurve, ratingDiff / (differenceScale * 2)));
  const normalizedLower = expectedLower * 2;

  const results: MarginResults = {
    winner: youRating > oppRating ? "Your" : "Opp.",
    higherScore: playedTo,
    lowerScore: Math.round(playedTo * normalizedLower),
  };

  return results;
}
