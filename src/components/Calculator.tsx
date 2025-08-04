import { useState, type ChangeEvent } from "react";
//import { Button } from "@/components/ui/button";
import RatingInput from "./RatingInput";
import { calculateMargin } from "@/utils/dupr";

import "./Calculator.css";

type RatingFields = {
  one: string;
  two: string;
  three: string;
  four: string;
};

const initial: RatingFields = { one: "", two: "", three: "", four: "" };

function Calculator() {
  const [fields, setFields] = useState<RatingFields>(initial);

  function isValid(input: string) {
    return /^[0-9]\.[0-9]{3}$/.test(input);
  }

  function allValid(): boolean {
    return (
      isValid(fields.one) &&
      isValid(fields.two) &&
      isValid(fields.three) &&
      isValid(fields.four)
    );
  }

  function handleInput(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.currentTarget;
    if (/^$|^[0-9](?:\.[0-9]{0,3})?$/.test(value)) {
      setFields((f) => ({ ...f, [name]: value }));
    }
  }

  function formatResults(): string {
    const { winner, higherScore, lowerScore } = calculateMargin(
      Object.values(fields).map((n) => Number.parseFloat(n)),
      11,
    );

    if (higherScore === lowerScore) {
      return "No Clear Favorite";
    } else if (winner === "Your") {
      return `${winner} Team Wins: ${higherScore}-${lowerScore}`;
    } else {
      return `${winner} Team Wins: ${lowerScore}-${higherScore}`;
    }
  }

  return (
    <main className="mt-5 md:mt-10">
      <div className="flex justify-between items-center">
        <h1>Win Margin Calculator</h1>
        {/*<Button
          className="w-10 h-10 ml-5 rounded-full bg-white/10 hover:bg-white/30
            active:bg-black/10 cursor-pointer"
        >
          <span className="text-xl font-extrabold text-white opacity-100">
            ?
          </span>
        </Button>*/}
      </div>
      <div
        className="bg-white p-5 pt-8 mt-3 md:pb-8 md:mt-5 rounded-2xl flex
          flex-col items-center duration-200"
      >
        <div className="flex flex-col max-w-2xs">
          <h2 className="text-navy-900">Player Ratings</h2>
          <div
            className="flex justify-between items-center self-center mt-2
              md:mt-5 w-full"
          >
            <div id="team-1">
              <div className="flex flex-col justify-between items-start">
                <h3 className="mb-2">Your Team</h3>
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
            <h3 className="mx-2 pt-3">vs.</h3>
            <div id="team-2">
              <div className="flex flex-col justify-between items-start">
                <h3 className="mb-2">Opp. Team</h3>
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
          <h3 className="mt-2">Expected Outcome</h3>
          <div
            className="bg-navy-900/10 flex justify-center items-center mt-2 h-12
              rounded-2xl"
          >
            <span
              className={`text-sm font-medium
                ${allValid() ? "text-navy-900/90" : "text-navy-900/20"}`}
            >
              {allValid() ? formatResults() : "Enter Ratings For Result"}
            </span>
          </div>
          <span
            className={`text-navy-900/50 text-[0.625rem] md:text-xs font-normal
              mt-2 text-center ${allValid() ? "opacity-100" : "opacity-0 h-0"}`}
          >
            To gain rating, you must <u>outperform</u> this score.
          </span>
        </div>
      </div>
    </main>
  );
}

export default Calculator;
