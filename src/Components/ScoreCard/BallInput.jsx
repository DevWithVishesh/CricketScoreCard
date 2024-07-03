import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React, { useState } from "react";
import { Form } from "reactstrap";

export const BallInput = ({ onAddBall }) => {
  const [runs, setRuns] = useState("");
  const [isNoBall, setIsNoBall] = useState(false);
  const [isWide, setIsWide] = useState(false);
  const [isWicket, setIsWicket] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const runsInt = parseInt(runs);
    if (runsInt > 6 || runsInt < 0) {
      alert("Enter valid runs");
    } else {
      if (!isNaN(runsInt) || isNoBall || isWide || isWicket) {
        onAddBall(runsInt, isNoBall, isWide, isWicket);
        setRuns("");
        setIsNoBall(false);
        setIsWide(false);
        setIsWicket(false);
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormLabel component="legend">Enter runs for the ball:</FormLabel>
      <RadioGroup
        className="d-block"
        row
        name="runs"
        value={runs}
        onChange={(e) => setRuns(Number(e.target.value))}
      >
        {[0, 1, 2, 3, 4, 5, 6].map((run) => (
          <FormControlLabel
            key={run}
            value={run}
            control={<Radio />}
            label={run.toString()}
          />
        ))}
      </RadioGroup>
      <Box className="form-check flex" sx={{ display: "inline-flex", gap: 2 }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={isNoBall}
              onChange={() => setIsNoBall(!isNoBall)}
            />
          }
          label="No Ball"
        />
        <FormControlLabel
          control={
            <Checkbox checked={isWide} onChange={() => setIsWide(!isWide)} />
          }
          label="Wide"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={isWicket}
              onChange={() => setIsWicket(!isWicket)}
            />
          }
          label="Wicket"
        />
      </Box>
      <Box>
        <Button variant="contained" color="primary" type="submit">
          Add Ball
        </Button>
      </Box>
    </Form>
  );
};
