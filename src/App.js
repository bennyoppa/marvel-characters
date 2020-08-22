import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Characters from "./components/Section/Characters/Characters";
import CharacterInfo from "./components/Section/CharacterInfo/CharacterInfo";
import NoMatch from "./components/Section/NoMatch/NoMatch";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route
            exact
            path="/characters"
            render={(routeProps) => <Characters {...routeProps} />}
          />
          <Route
            exact
            path="/characters/:id"
            render={(routeProps) => <CharacterInfo {...routeProps} />}
          />
          <Route component={NoMatch} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
