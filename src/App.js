import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Game } from "./Components/ScoreCard/Game";
import { useState } from "react";
import {  Form } from "reactstrap";
import { Box, Button, Slider } from "@mui/material";

const App = () => {
  const [totalOvers, setTotalOvers] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    setTotalOvers(parseInt(e.target.totalOver.value));
    console.log(totalOvers);
  };
  function valuetext(value) {
    return `${value}`;
  }
  const overs = [
    {
      value: 2,
      label: "2",
    },
    {
      value: 10,
      label: "10",
    },
    {
      value: 20,
      label: "20",
    },
    {
      value: 50,
      label: "50",
    },
  ];
  return (
    <div className="App">
      {totalOvers === 0 ? (
        <>
          <Box sx={{ width: 500, marginLeft: "auto", marginRight: "auto" }}>
            <Form onSubmit={handleSubmit}>
              <h1>Enter number of overs</h1>
              <Slider
                aria-label="Restricted values"
                defaultValue={2}
                getAriaValueText={valuetext}
                step={null}
                max={50}
                valueLabelDisplay="auto"
                marks={overs}
                name="totalOver"
              />
              <Button type="submit" variant="contained">
                Submit
              </Button>
            </Form>
          </Box>
        </>
      ) : (
        <Game totalOvers={totalOvers} />
      )}
    </div>
  );
};
export default App;
