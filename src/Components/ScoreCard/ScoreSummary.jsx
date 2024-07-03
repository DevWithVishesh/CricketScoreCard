import React from "react";
export const ScoreSummary = ({ balls }) => {
  const groupByOvers = (balls) => {
    const overs = [];
    let currentOver = [];
    let ballCount = 0;

    balls.forEach((ball) => {
      currentOver.push(ball);
      if (!ball.isNoBall && !ball.isWide) {
        ballCount++;
      }
      if (ballCount === 6) {
        overs.push(currentOver);
        currentOver = [];
        ballCount = 0;
      }
    });

    if (currentOver.length > 0) {
      overs.push(currentOver);
    }

    return overs;
  };

  const overs = groupByOvers(balls);

  return (
    <div>
      <h2>Score Summary</h2>
      {overs.map((over, index) => (
      <div key={index} className="mb-3">
        <h3>Over {index + 1}</h3>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Ball</th>
              <th>Runs</th>
              <th>Extras</th>
              <th>Wicket</th>
            </tr>
          </thead>
          <tbody>
            {over.map((ball, ballIndex) => (
              <tr key={ballIndex}>
                <td>{ballIndex + 1}</td>
                <td>{ball.runs} runs</td>
                <td>
                  {ball.isNoBall && "No Ball "}
                  {ball.isWide && "Wide "}
                </td>
                <td>{ball.isWicket && "Wicket"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ))}
    </div>
  );
};