import React ,{ useState } from "react";

export const BallInput = ({ onAddBall }) => {
    const [runs, setRuns] = useState('');
    const [isNoBall, setIsNoBall] = useState(false);
    const [isWide, setIsWide] = useState(false);
    const [isWicket, setIsWicket] = useState(false);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const runsInt = parseInt(runs);
      if (!isNaN(runsInt) || isNoBall || isWide || isWicket) {
        onAddBall(runsInt, isNoBall, isWide, isWicket);
        setRuns('');
        setIsNoBall(false);
        setIsWide(false);
        setIsWicket(false);
      }
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={runs}
          max={6}
          onChange={(e) => setRuns(e.target.value?e.target.value:0)}
          placeholder="Enter runs for the ball"
          disabled={isNoBall || isWide || isWicket}
        />
        <label>
          <input
            type="checkbox"
            checked={isNoBall}
            onChange={() => setIsNoBall(!isNoBall)}
          />
          No Ball
        </label>
        <label>
          <input
            type="checkbox"
            checked={isWide}
            onChange={() => setIsWide(!isWide)}
          />
          Wide
        </label>
        <label>
          <input
            type="checkbox"
            checked={isWicket}
            onChange={() => setIsWicket(!isWicket)}
          />
          Wicket
        </label>
        <button type="submit">Add Ball</button>
      </form>
    );
  };
  