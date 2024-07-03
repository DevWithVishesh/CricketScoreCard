import { useEffect, useState } from "react";
import { TeamScorecard } from "../TeamScore";
import { BallInput } from "./BallInput";
import { ScoreSummary } from "./ScoreSummary";
import { Paper } from "@mui/material";

export const Game = ({ totalOvers }) => {
  const [team1, setTeam1] = useState({ score: 0, balls: [], wickets: 0 });
  const [team2, setTeam2] = useState({ score: 0, balls: [], wickets: 0 });
  const [currentTeam, setCurrentTeam] = useState(1);
  const [overs, setOvers] = useState(0);
  const [currentBall, setCurrentBall] = useState(0);
  const [isMatchOver, setIsMatchOver] = useState(false);
  const [matchOverMessage, setMatchOverMessage] = useState("");
  const totalballs = totalOvers * 6;
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
    if (currentTeam === 2) {
      if (team2.score > team1.score) {
        setMatchOverMessage(
          "Team 2 won the match by " +
            (10 - team2.wickets) +
            " wickets " +
            (totalballs - (overs * 6 + currentBall)) +
            " Balls Left"
        );
        setIsMatchOver(true);
      }
      if (team2.wickets === 10) {
        setMatchOverMessage(
          "Team 1 won the match by " + (team2.score - team1.score) + " runs"
        );
        setIsMatchOver(true);
      }
      if (totalOvers === overs && team1.score > team2.score) {
        setMatchOverMessage(
          "Team 1 won the match by " + (team1.score - team2.score) + " runs"
        );
        setIsMatchOver(true);
      }
      if (totalOvers === overs && team2.score === team1.score) {
        setMatchOverMessage("Match is drawn");
        setIsMatchOver(true);
      }
    }
    if (overs === totalOvers || team1.wickets === 10) {
      if (currentTeam === 1) {
        setCurrentTeam(2);
        setOvers(0);
        setCurrentBall(0);
      }
    }
  },[currentBall, currentTeam, overs, team1, team2, totalballs, totalOvers]);

  return (
    <div>
      <h1>Cricket Scorecard</h1>
      <TeamScorecard team={1} score={team1.score} wickets={team1.wickets} />
      <TeamScorecard team={2} score={team2.score} wickets={team2.wickets} />
      {!isMatchOver ? (
        <>
          <BallInput onAddBall={handleAddBall} />
          <h2>
            Overs: {overs}.{currentBall}
          </h2>
          <ScoreSummary balls={currentTeam === 1 ? team1.balls : team2.balls} />
        </>
      ) : (
        <>
          <h2>{matchOverMessage}</h2>
          <div className="d-flex gap-4">
            <Paper elevation={3} className="w-50">
              <h2>Team 1</h2>
              <ScoreSummary balls={team1.balls} />
            </Paper>
            <Paper elevation={3} className="w-50">
              <h2>Team 2</h2>
              <ScoreSummary balls={team2.balls} />
            </Paper>
          </div>
        </>
      )}
    </div>
  );
};
