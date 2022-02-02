import { Redirect, Route } from "react-router-dom";

const UnAuthenticatedRoute =  ({ component: C, appProps, ...rest }) =>
  <Route
    {...rest}
    render={props =>
      appProps.isAuthenticated === "FALSE"
        ? <C {...props} {...appProps} />
        : <Redirect to="/" />}
  />;

  export default UnAuthenticatedRoute;