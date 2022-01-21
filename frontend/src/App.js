import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import Blog from "./Components/Blog/Blog";
import Header from "./Components/Header";
import Home from "./Components/Home";
import AddKisan from "./Components/Kisan/AddKisan/AddKisan";
import Debitform from "./Components/Kisan/KisanDetails/DebitForm";
import Kisandetails from "./Components/Kisan/KisanDetails/KisanDetails";
import KisanLanding from "./Components/Kisan/KisanLanding";
import Landing from "./Components/Landing/Landing";
import NavBar from "./Components/NavBar/NavBar";

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <div className="AppContent">
        <Switch>
          <Route exact path="/" component={Landing}></Route>
          <Route exact path="/addKisan" component={AddKisan}></Route>
          <Route exact path="/kisan" component={KisanLanding}></Route>
          <Route
            exact
            path="/kisanDetails/:id"
            component={Kisandetails}
          ></Route>
          <Route exact path="/kisanDebitForm/:id" component={Debitform}></Route>
          <Route exact path="/Blog" component={Blog}></Route>
        </Switch>
      </div>
    </React.Fragment>
  );
}

export default App;
