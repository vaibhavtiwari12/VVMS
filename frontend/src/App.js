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
import { I18nProvider, LOCALES } from "./i18n";
import ErrorBoundary from "./Components/ErrorBoundary/ErrorBoundary";
import Advancesettlementform from "./Components/Kisan/KisanDetails/AdvanceSettlementForm";
import InventoryLanding from "./Components/Inventory/InventoryLanding";
import AddInventoryType from "./Components/Inventory/AddInventoryType";

function App() {
  const [isAuthenticated, userHasAuthenticated] = useState("INIT");
  const [locale, setLocale] = useState(LOCALES.ENGLISH);
  const history = useHistory();
  useEffect(() => {
    let doesHisotoryAlreadyLoaded = false;
    history.listen(() => {
      onLoad();
      doesHisotoryAlreadyLoaded = true;
    });
    if (!doesHisotoryAlreadyLoaded) {
      onLoad();
    }
  }, []);

  async function onLoad() {
    try {
      const sessionDetails = await axios.get("/hasValidSession");
      window.sessionStorage.setItem("userName", sessionDetails.data.User);
      userHasAuthenticated("TRUE");
    } catch (error) {
      window.sessionStorage.removeItem("userName");
      userHasAuthenticated("FALSE");
    }
  }

  const logout = async () => {
    window.sessionStorage.removeItem("userName");
    await axios.get("/logout");
    history.push("/Login");
  };

  const changelanguage = (isLanguageEnglish) => {
    if (isLanguageEnglish) {
      setLocale(LOCALES.ENGLISH);
    } else {
      setLocale(LOCALES.HINDI);
    }
  };

  return (
    <React.Fragment>
      <ErrorBoundary>
        <I18nProvider locale={locale}>
          <NavBar
            isAuthenticated={isAuthenticated}
            logout={logout}
            changelanguage={changelanguage}
          />
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
                history={history}
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
                path="/addInventoryType"
                component={AddInventoryType}
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
                path="/kisanAdvanceSettlement/:id/:type"
                component={Advancesettlementform}
                appProps={{ isAuthenticated }}
              />
              <AuthenticatedRoute
                exact
                path="/kisanAdvanceSettlement/:id/:type/:transactionNumber"
                component={Advancesettlementform}
                appProps={{ isAuthenticated }}
              />
              <AuthenticatedRoute
                exact
                path="/inventory"
                component={InventoryLanding}
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
        </I18nProvider>
      </ErrorBoundary>
    </React.Fragment>
  );
}

export default App;
