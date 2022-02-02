import React, { Fragment, useEffect, useState } from "react";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import "./App.css";
import AddKisan from "./Components/Kisan/AddKisan/AddKisan";
import CreditForm from "./Components/Kisan/KisanDetails/CreditForm";
import Debitform from "./Components/Kisan/KisanDetails/DebitForm";
import Kisandetails from "./Components/Kisan/KisanDetails/KisanDetails";
import KisanLanding from "./Components/Kisan/KisanLanding";
import Landing from "./Components/Landing/Landing";
import NavBar from "./Components/NavBar/NavBar";
import Report from "./Components/Kisan/Report/Report";
import Login from "./Components/Login/Login";
import AuthenticatedRoute from "./Auth/AuthenticatedRoute";
import UnAuthenticatedRoute from "./Auth/unAuthenticatedRoute";
import axios from "axios";

function App() {
  const [isAuthenticated, userHasAuthenticated] = useState("INIT");
  const history = useHistory();
  useEffect(() => {
    console.log("IS in the use Effect");
    let doesHisotoryAlreadyLoaded = false;
    history.listen(() => {
      console.log("IS in the history to be changed");
      onLoad();
      doesHisotoryAlreadyLoaded = true;
    });
    if (!doesHisotoryAlreadyLoaded) {
      onLoad();
    }
  }, []);

  async function onLoad() {
    console.log("in on load functions");
    const userName = window.sessionStorage.getItem("userName");
    if (userName && userName.length > 0) {
      console.log("valid User In sesssion.", userName);
      userHasAuthenticated("TRUE");
    } else {
      userHasAuthenticated("FALSE");
    }
  }

  const logout = async () => {
    window.sessionStorage.removeItem("userName");
    await axios.get("/logout");
    history.push("/Login");
  };

  return (
    <React.Fragment>
      <NavBar isAuthenticated={isAuthenticated} logout={logout} />
      <div className="AppContent">
        <Switch>
          <AuthenticatedRoute
            exact
            path="/"
            component={Landing}
            appProps={{ isAuthenticated }}
          />
          <UnAuthenticatedRoute
            exact
            path="/Login"
            component={Login}
            appProps={{ isAuthenticated }}
          />
          <AuthenticatedRoute
            exact
            path="/addKisan"
            component={AddKisan}
            appProps={{ isAuthenticated }}
          />
          <AuthenticatedRoute
            exact
            path="/kisan"
            component={KisanLanding}
            appProps={{ isAuthenticated }}
          />
          <AuthenticatedRoute
            exact
            path="/kisanDetails/:id"
            component={Kisandetails}
            appProps={{ isAuthenticated }}
          />
          <AuthenticatedRoute
            exact
            path="/kisanDebitForm/:id/:type"
            component={Debitform}
            appProps={{ isAuthenticated }}
          />
          <AuthenticatedRoute
            exact
            path="/kisanDebitForm/:id/:type/:transactionNumber"
            component={Debitform}
            appProps={{ isAuthenticated }}
          />
          <AuthenticatedRoute
            exact
            path="/kisanCreditForm/:id/:type"
            component={CreditForm}
            appProps={{ isAuthenticated }}
          />
          <AuthenticatedRoute
            exact
            path="/kisanCreditForm/:id/:type/:transactionNumber"
            component={CreditForm}
            appProps={{ isAuthenticated }}
          />

          <AuthenticatedRoute
            exact
            path="/Report"
            component={Report}
            appProps={{ isAuthenticated }}
          />
        </Switch>
      </div>
    </React.Fragment>
  );
}

export default App;
