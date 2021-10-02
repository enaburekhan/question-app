import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Question from '../components/Question';
import Signup from './Signup';
import Login from './Login';
import NavBar from '../components/Navbar';
import NewAnswer from '../components/newAnswer';

function App() {
  return (

    <div className="container">
      <div className="row">

        <Router>
          <div className="col-3">
            <NavBar />
          </div>
          <Switch>
            <div className="col-9">
              <Route exact path="/Signup" component={Signup} />
              <Route exact path="/Login" component={Login} />
              <Route exact path="/questions" component={Question} />
              <Route exact path="/answers/new" component={NewAnswer} />
            </div>
          </Switch>
        </Router>

      </div>

    </div>

  );
}

export default App;
