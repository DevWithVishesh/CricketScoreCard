import { useEffect, useState } from "react";
import { TeamScorecard } from "../TeamScore";
import { BallInput } from "./BallInput";
import { ScoreSummary } from "./ScoreSummary";

export const Game = ({ totalOvers }) => {
  const [team1, setTeam1] = useState({ score: 0, balls: [], wickets: 0 });
  const [team2, setTeam2] = useState({ score: 0, balls: [], wickets: 0 });
  const [currentTeam, setCurrentTeam] = useState(1);
  const [overs, setOvers] = useState(0);
  const [currentBall, setCurrentBall] = useState(0);

  const handleAddBall = (runs, isNoBall, isWide, isWicket) => {
    if (isNaN(runs)) {
      runs = 0;
    }
    const updateTeam = (team) => {
      const newBalls = [...team.balls, { runs, isNoBall, isWide, isWicket }];
      const newScore = team.score + runs + (isNoBall || isWide ? 1 : 0);
      const newWickets = team.wickets + (isWicket ? 1 : 0);
      return { ...team, score: newScore, balls: newBalls, wickets: newWickets };
    };

    if (currentTeam === 1) {
      setTeam1(updateTeam(team1));
    } else {
      setTeam2(updateTeam(team2));
    }

    if (!isNoBall && !isWide) {
      setCurrentBall(currentBall + 1);
      if (currentBall + 1 === 6) {
        setOvers(overs + 1);
        setCurrentBall(0);
      }
    }
  };
  useEffect(() => {
    if (overs === totalOvers || team1.wickets === 10) {
      switchTeams();
    }
    if (currentTeam === 2) {
      if (team2.score > team1.score) {
        alert("Team 2 won the match");
      }
      if (team2.wickets === 10) {
        alert("Team 1 won the match");
      }
      if (totalOvers === overs && team1.score > team2.score) {
        alert("Team 1 won the match");
      }
      if (totalOvers === overs && team2.score === team1.score) {
        alert("Match is drawn");
      }
    }
  });
  const switchTeams = () => {
    setCurrentTeam(2);
    setOvers(0);
    setCurrentBall(0);
  };

  return (
    <div>
      <h1>Cricket Scorecard</h1>
      <TeamScorecard team={1} score={team1.score} wickets={team1.wickets} />
      <TeamScorecard team={2} score={team2.score} wickets={team2.wickets} />
      <BallInput onAddBall={handleAddBall} />
      <ScoreSummary balls={currentTeam === 1 ? team1.balls : team2.balls} />
      <h2>
        Overs: {overs}.{currentBall}
      </h2>
    </div>
  );
};
