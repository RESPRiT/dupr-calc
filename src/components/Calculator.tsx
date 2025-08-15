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
    <main className="mt-[clamp(1.25rem,5vh,2.5rem)]">
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
        className="bg-white p-[clamp(1.25rem,6.5vw,2rem)] pt-8 mt-3 md:pb-8
          md:mt-5 rounded-2xl flex flex-col items-center duration-200"
      >
        <div className="flex flex-col">
          <h2 className="text-navy-900">Player Ratings</h2>
          <div
            className="flex flex-col justify-between items-start self-center
              mt-2 md:mt-5 w-full"
          >
            <div id="team-1" className="w-full">
              <h3 className="mb-[clamp(0.5rem,1.5vh,1rem)]">Your Team</h3>
              <div
                className="flex justify-around space-x-[clamp(1rem,5vw,2rem)]"
              >
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
              <div className="flex justify-around space-x-[clamp(1rem,6%,2rem)]">
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
              mt-[clamp(0.5rem,1.5vh,1rem)] h-12 rounded-2xl"
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
