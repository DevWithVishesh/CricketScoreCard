import React from "react";

export const ScoreSummary = ({ balls }) => {
    return (
      <div>
        <h2>Score Summary</h2>
        <ul>
          {balls.map((ball, index) => (
            <li key={index}>
              Ball {index + 1}: {ball.runs} runs
              {ball.isNoBall && ' (No Ball)'}
              {ball.isWide && ' (Wide)'}
              {ball.isWicket && ' (Wicket)'}
            </li>
          ))}
        </ul>
      </div>
    );
  };