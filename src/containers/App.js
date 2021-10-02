// import {
//   BrowserRouter as Router, Route, Switch,
// } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';

import Question from '../components/Question';
import Signup from './Signup';
import Login from './Login';

function App() {
  return (

    <div className="container">
      <div className="row">

        <Signup />
        <Login />
        <Question />

      </div>

    </div>

  );
}

export default App;
