export const TeamScorecard = ({ team, score, wickets }) => {
    return (
      <div>
        <h2>Team {team} Score: {score}/{wickets}</h2>
      </div>
    );
  };