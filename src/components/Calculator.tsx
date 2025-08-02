import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import "./Calculator.css";

function Calculator() {
  return (
    <main className="mt-10">
      <div className="flex justify-between items-center">
        <h1>
          Win Margin Calculator
        </h1>
        <Button className="w-10 h-10 ml-5 rounded-full bg-white/10
            hover:bg-white/30 cursor-pointer">
          <span className="text-xl font-extrabold text-white opacity-100">?</span>
        </Button>
      </div>
      <div className="bg-white p-5 pt-8 md:pb-8 mt-5 rounded-2xl flex flex-col items-center">
        <div className="flex flex-col max-w-2xs">
          <h2 className="text-navy-900">Player Ratings</h2>
          <div className="flex justify-between items-center self-center mt-5 w-full">
            <div id="team-1">
              <div className="flex flex-col justify-between items-start">
                <h3 className="mb-2">Your Team</h3>
                <Input className="rating-input" placeholder="Player 1" />
                <Input className="rating-input" placeholder="Player 2" />
              </div>
            </div>
            <h3 className="mx-2 pt-5">vs.</h3>
            <div id="team-2">
              <div className="flex flex-col justify-between items-start">
                <h3 className="mb-2">Opp. Team</h3>
                <Input className="rating-input" placeholder="Player 3" />
                <Input className="rating-input" placeholder="Player 4" />
              </div>
            </div>
          </div>
          <h3 className="mt-2">Expected Outcome</h3>
          <div className="bg-navy-900/10 flex justify-center items-center mt-1 h-12 rounded-2xl">
            <span className="text-sm font-medium text-navy-900/90">
              Your Team Wins: 11-5
            </span>
          </div>
          <span className="text-navy-900/60 text-[0.75rem] md:text-xs font-normal mt-2">
            To gain rating, you must <u>outperform</u> this score.
          </span>
        </div>
      </div>
    </main>
  );
}

export default Calculator;