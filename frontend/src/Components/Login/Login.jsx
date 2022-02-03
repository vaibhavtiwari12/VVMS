import axios from "axios";
import React from "react";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { useHistory } from "react-router-dom";
import {
  Alert,
  Button,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isUsernameValid, setIsUsernameValid] = useState("PRISTINE");
  const [isPasswordValid, setIsPasswordValid] = useState("PRISTINE");
  const [hasError, setHasError] = useState("");
  const history = useHistory();
  const isFormvalid = () => {
    let isValid = true;
    if (username.length === 0) {
      isValid = false;
      setIsUsernameValid("")
    }
    if (password.length === 0) {
      isValid = false;
      setIsPasswordValid("");
    }
    return isValid;
  };
  const submit = async (e) => {
      e.preventDefault();
      if (isFormvalid()) {
      console.log("Is Here")
      try{
        const loginResponse = await axios.post('/getLogin',{
          userName: username, 
          password: password
        })
        setHasError("");
        window.sessionStorage.setItem("userName", username);
        history.push('/kisan')
      }catch (error) {
        setHasError(error.response.data.message)
      }
    }
  };
  const userNameChange = (e) => {
    setUsername(e.target.value);
    setIsUsernameValid("");
  };

  const passwordChange = (e) => {
    setPassword(e.target.value);
    setIsPasswordValid("");
  };
  const clear = () => {
    setPassword("");
    setUsername("");
    setIsPasswordValid("PRISTINE");
    setIsUsernameValid("PRISTINE");
  };
  return (
    <div className="d-flex justify-content-center">
      <div className="form-width">
        <h2 className="text-center text-secondary mt-3"><FormattedMessage id="login"/ ></h2>
        <Form onSubmit={(e) => submit(e)} className="p-3">
           {hasError && hasError.length>0 && <Alert color="danger"> {hasError} </Alert>}
          <FormGroup className="mt-2">
            <Label for="username"> <FormattedMessage id="username"/ > </Label>
            <Input
              invalid={username.length === 0 && isUsernameValid === ""}
              name="username"
              type="text"
              value={username}
              onChange={(e) => userNameChange(e)}
            />
            <FormFeedback><FormattedMessage id="usernameError" /></FormFeedback>
          </FormGroup>
          <FormGroup className="mt-2">
            <Label for="password"> <FormattedMessage id="password"/></Label>
            <Input
              invalid={password.length === 0 && isPasswordValid === ""}
              name="password"
              type="password"
              value={password}
              onChange={(e) => passwordChange(e)}
            />
            <FormFeedback><FormattedMessage id="passwordError" /></FormFeedback>
          </FormGroup>
          <React.Fragment>
            <Button type="submit" color="primary" className="mt-3" size="lg">
            <FormattedMessage id="signin" />
            </Button>
            {/* <Button
              type="reset"
              color="danger"
              className="ms-1 mt-3"
              onClick={clear}
            >
              Reset
            </Button> */}
          </React.Fragment>
        </Form>
      </div>
    </div>
  );
};

export default Login;
