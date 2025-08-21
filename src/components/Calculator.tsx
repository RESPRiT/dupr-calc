import { useState, type ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import RatingInput from "./RatingInput";
import { calculateMargin } from "@/utils/dupr";

import "./Calculator.css";

type RatingFields = {
  one: string;
  two: string;
  three: string;
  four: string;
};

const initialFields: RatingFields = { one: "", two: "", three: "", four: "" };
const validInput = /^[0-9]\.[0-9]{3}$/;

function Calculator() {
  const [fields, setFields] = useState<RatingFields>(initialFields);

  const allValid = Object.values(fields).every((v) => validInput.test(v));

  function handleInput(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.currentTarget;
    if (/^$|^[0-9](?:\.[0-9]{0,3})?$/.test(value)) {
      setFields((f) => ({ ...f, [name]: value }));
    }
  }

  const results = allValid
    ? calculateMargin(Object.values(fields).map(Number.parseFloat), 11)
    : undefined;

  function formatResults(): string {
    if (results === undefined) return "Enter Ratings For Result";

    if (results.higherScore === results.lowerScore) {
      return "No Clear Favorite";
    } else if (results.winner === "Your") {
      return `${results.winner} Team Wins: ${results.higherScore}-${results.lowerScore}`;
    } else {
      return `${results.winner} Team Wins: ${results.lowerScore}-${results.higherScore}`;
    }
  }

  const resultsOutput = formatResults();

  return (
    <main className="mt-[clamp(1.25rem,5vh,2.5rem)]">
      <div className="flex justify-between items-center">
        <h1>Win Margin Calculator</h1>
        <Button
          className="w-10 h-10 ml-5 rounded-full bg-white/10 hover:bg-white/30
            active:bg-black/10 cursor-pointer"
        >
          <span className="text-xl font-extrabold text-white opacity-100">
            ?
          </span>
        </Button>
      </div>
      <div
        className="bg-white p-[clamp(1.25rem,6.5vw,2rem)] md:pb-6 mt-3 md:mt-5
          rounded-2xl flex flex-col"
      >
        <h2>Player Ratings</h2>
        <div
          className="flex flex-col justify-between items-start self-center mt-2
            md:mt-5 w-full"
        >
          <div id="team-1" className="w-full">
            <h3 className="mb-[clamp(0.5rem,1.5vh,1rem)]">Your Team</h3>
            <div className="flex justify-evenly space-x-[clamp(1rem,6%,2rem)]">
              <RatingInput
                name="one"
                placeholder="Player 1"
                value={fields.one}
                onChange={handleInput}
              />
              <RatingInput
                name="two"
                placeholder="Player 2"
                value={fields.two}
                onChange={handleInput}
              />
            </div>
          </div>
          <div id="team-2" className="w-full">
            <h3 className="my-[clamp(0.5rem,1.5vh,1rem)]">Opp. Team</h3>
            <div className="flex justify-evenly space-x-[clamp(1rem,6%,2rem)]">
              <RatingInput
                name="three"
                placeholder="Player 3"
                value={fields.three}
                onChange={handleInput}
              />
              <RatingInput
                name="four"
                placeholder="Player 4"
                value={fields.four}
                onChange={handleInput}
              />
            </div>
          </div>
        </div>
        <h3 className="mt-[clamp(0.875rem,2vh,1.25rem)]">Expected Outcome</h3>
        <div
          className="bg-navy-900/10 flex justify-center items-center
            mt-[clamp(0.5rem,1.5vh,1rem)] h-[clamp(3rem,7vh,4rem)] rounded-2xl"
        >
          <span
            className={`text-[clamp(0.875rem,0.25rem+3vw,1rem)] md:text-sm
              font-medium ${allValid ? "text-navy-900/90" : "text-navy-900/20"}`}
          >
            {resultsOutput}
          </span>
        </div>
        <span
          className={`text-navy-900/50 text-[clamp(0.625rem,3vw,0.75rem)]
            font-normal mt-2 text-center ${allValid ? "" : "hidden"}`}
        >
          {results !== undefined && results.ratingDiff > 1.0 ? (
            <span>
              Due to large rating gap, your rating <u>will not change.</u>
            </span>
          ) : results?.higherScore === results?.lowerScore ? (
            <span>
              To gain rating, you must <u>win this match.</u>
            </span>
          ) : (
            <span>
              To gain rating, you must <u>outperform this score.</u>
            </span>
          )}
        </span>
      </div>
    </main>
  );
}

export default Calculator;
