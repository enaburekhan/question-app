import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';

import Question from '../components/Question';

function App() {
  return (

    <div className="container">
      <div className="row">
        <Router>

          <Switch>
            <div className="col-9">
              <Route exact path="/questions" component={Question} />

            </div>
          </Switch>
        </Router>
      </div>

    </div>

  );
}

export default App;
