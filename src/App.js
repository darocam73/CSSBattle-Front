import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Header from './components/Header';
import Home from './pages/Home';
import Battle from './pages/Battle';
import Score from './pages/Score';
import { ManagedBattleContext } from './lib/hooks/useBattle';
import './App.scss';

function App() {
  return (
    <Router>
      <ManagedBattleContext>
        <div className="App">
          <Header />
          <Switch>
            <Route path="/challenge/:battleId">
              <Battle />
            </Route>
            <Route path="/score/:battleId">
              <Score />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </ManagedBattleContext>
    </Router>
  );
}

export default App;
