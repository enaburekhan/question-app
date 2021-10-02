import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Question from '../components/Question';
import Signup from './Signup';
import Login from './Login';

function App() {
  return (

    <div className="container">
      <div className="row">

        <Router>
          <Switch>
            <div className="col-9">
              <Route exact path="/Signup" component={Signup} />
              <Route exact path="/Login" component={Login} />
              <Route exact path="/questions" component={Question} />
            </div>
          </Switch>
        </Router>

      </div>

    </div>

  );
}

export default App;
