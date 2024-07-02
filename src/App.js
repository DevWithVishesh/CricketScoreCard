import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Game } from './Components/ScoreCard/Game';
import { useState } from 'react';
import { Form, Input } from 'reactstrap';


const App = () => {
const [totalOvers, setTotalOvers] = useState(0);

const handleSubmit = (e) => {
  e.preventDefault();
  setTotalOvers(parseInt(e.target.totalOver.value));
  console.log(totalOvers);
}

return (
  <div className="App">
{totalOvers === 0 ? (
        <>
          <Form onSubmit={handleSubmit}>            <h1>Enter number of overs</h1>                                                                            
            <Input type="number" defaultValue={0} name="totalOver" />
            <Input type="submit" value="Submit" />
          </Form>
        </>
      ) : (
        <Game totalOvers={totalOvers} />
      )}
  </div>
)

};
export default  App;