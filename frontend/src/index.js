import React from 'react';
import ReactDOM from 'react-dom';
// import "@fontsource/varela-round";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
//Imports for Redux and Redux thunk
import {createStore, applyMiddleware, compose} from "redux";
import { Provider } from 'react-redux'
import thunk from "redux-thunk";


//Imports for Router 
import { createBrowserHistory } from 'history';
import { routerMiddleware, ConnectedRouter } from 'connected-react-router';
import createRootReducer from './Store/reducer';


export const history = createBrowserHistory();
/* const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; */
const composeEnhancers = compose;
/* const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk))); */
const store = createStore(createRootReducer(history),
                composeEnhancers(applyMiddleware(thunk,routerMiddleware(history))))
ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      
        <App/>
      
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
