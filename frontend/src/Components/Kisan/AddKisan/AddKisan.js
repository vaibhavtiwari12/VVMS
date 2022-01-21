import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormFeedback,
  Alert,
} from "reactstrap";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const AddKisan = () => {
  const [name, setName] = useState("");
  const [fatherName, setfatherName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [isnameValid, setIsnameValid] = useState("PRISTINE");
  const [isfatherNameValid, setIsfatherNameValid] = useState("PRISTINE");
  const [isPhonePristine, setIsPhonePristine] = useState("PRISTINE");
  const [isAddressValid, setIsAddressValid] = useState("PRISTINE");
  const [hasError, setHasError] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const isFormValid = () => {
    let isInvalid = false;
    if (name.length <= 0) {
      setIsnameValid("");
      isInvalid = true;
    }
    if (fatherName.length <= 0) {
      setIsfatherNameValid("");
      isInvalid = true;
    }
    if (phone.length <= 0) {
      setIsPhonePristine("");
      isInvalid = true;
    }
    if (address.length <= 0) {
      setIsAddressValid("");
      isInvalid = true;
    }
    return isInvalid ? false : true;
  };
  const history = useHistory();
  const nameChange = (e) => {
    setName(e.target.value);
    setIsnameValid("");
  };
  const fatherNameChange = (e) => {
    setfatherName(e.target.value);
    setIsfatherNameValid("");
  };

  const phoneChange = (e) => {
    setPhone(e.target.value);
    setIsPhonePristine("");
  };
  const addressChange = (e) => {
    setAddress(e.target.value);
    setIsAddressValid("");
  };
  const clear = () => {
    setName("");
    setfatherName("");
    setPhone("");
    setAddress("");
    setHasError(false);
    setIsfatherNameValid("PRISTINE");
    setIsnameValid("PRISTINE");
    setIsPhonePristine("PRISTINE");
    setIsAddressValid("PRISTINE");
  };
  const submit = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      const formData = {
        name,
        fatherName,
        phone,
        address,
      };
      fetch("/kisan/add", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          console.log("Res", res);
          handleAlert();
          clear();
        })
        .catch((error) => {
          console.log("is Here", error);
          throw new error("Somethign Went Wrong", error);
        });
    } else {
      setHasError(true);
    }
  };

  const handleAlert = () => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
      history.push("/kisan");
    }, 4000);
  };
  return (
    <Form onSubmit={(e) => submit(e)} className="p-3">
      {/*  {hasError && <Alert color="danger"> FORM HAS AN ERROR </Alert>}{" "} */}
      <FormGroup className="mt-2">
        <Label for="name"> Name </Label>{" "}
        <Input
          invalid={name.length <= 0 && isnameValid === ""}
          name="name"
          type="text"
          value={name}
          onChange={(e) => nameChange(e)}
        />{" "}
        <FormFeedback> name is required. </FormFeedback>{" "}
      </FormGroup>{" "}
      <FormGroup className="mt-2">
        <Label for="fatherName"> Father 's Name</Label>{" "}
        <Input
          invalid={fatherName.length <= 0 && isfatherNameValid === ""}
          name="fatherName"
          type="text"
          value={fatherName}
          onChange={(e) => fatherNameChange(e)}
        />{" "}
        <FormFeedback> Father 's Name is required</FormFeedback>{" "}
      </FormGroup>{" "}
      <FormGroup className="mt-2">
        <Label for="phone"> Phone Number </Label>{" "}
        <Input
          invalid={phone.length <= 0 && isPhonePristine === ""}
          name="phone"
          type="phone"
          value={phone}
          onChange={(e) => phoneChange(e)}
        />{" "}
        <FormFeedback> Phone Number is required. </FormFeedback>{" "}
      </FormGroup>{" "}
      <FormGroup className="mt-2">
        <Label for="address"> Address </Label>{" "}
        <Input
          invalid={address.length <= 0 && isAddressValid === ""}
          name="address"
          type="text"
          value={address}
          onChange={(e) => addressChange(e)}
        />{" "}
        <FormFeedback> Address is required. </FormFeedback>{" "}
      </FormGroup>{" "}
      <Button type="submit" color="primary" className="mt-3">
        {" "}
        Add Kisan{" "}
      </Button>{" "}
      <Button type="reset" color="danger" className="ms-1 mt-3" onClick={clear}>
        {" "}
        Reset{" "}
      </Button>{" "}
      {showAlert ? (
        <Alert className="mt-4">Kisan has been added successfully</Alert>
      ) : (
        ""
      )}
    </Form>
  );
};

export default AddKisan;
