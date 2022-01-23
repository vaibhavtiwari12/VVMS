import React, { useEffect } from "react";
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
import { useHistory, useParams } from "react-router-dom";
import { getKisanByID } from "../../../Utility/utility";
import Kisanmoneysummary from "./KisanMoneySummary";

const Debitform = () => {
  const { id, type, transactionNumber } = useParams();
  const [comment, setComment] = useState("");
  const [amount, setAmount] = useState("");
  const [isCommentValid, setIsCommentValid] = useState("PRISTINE");
  const [isAmountValid, setIsAmountValid] = useState("PRISTINE");
  const [kisan, setKisan] = useState({});
  const [hasError, setHasError] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    try {
      console.log(id, type, transactionNumber);
      const fetchData = async () => {
        setKisan(await getKisanByID(id));
      };
      fetchData();
    } catch (e) {
      throw new Error("Something Went Wrong ", e);
    }
  }, []);

  useEffect(() => {
    if (transactionNumber && Object.keys(kisan).length > 0) {
      const transactionToedit = kisan.transactions.filter(
        (transac) => transac._id === transactionNumber.toString()
      )[0];

      console.log("transactionToedit", transactionToedit);
      setAmount(transactionToedit.transactionAmount);
      setComment(transactionToedit.comment);
    }
  }, [kisan]);

  const isFormValid = () => {
    let isInvalid = false;
    if (comment.length <= 0) {
      setIsCommentValid("");
      isInvalid = true;
    }
    if (amount.length <= 0) {
      setIsAmountValid("");
      isInvalid = true;
    }

    return isInvalid ? false : true;
  };
  const history = useHistory();
  const commentChange = (e) => {
    setComment(e.target.value);
    setIsCommentValid("");
  };
  const amountChange = (e) => {
    setAmount(e.target.value);
    setIsAmountValid("");
  };

  const clear = () => {
    setAmount("");
    setComment("");

    setHasError(false);
    setIsCommentValid("PRISTINE");
    setIsAmountValid("PRISTINE");
  };
  const submit = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      const formData = {
        transaction: {
          balanceAfterThisTransaction: kisan.balance + (amount - amount * 2),
          transactionAmount: amount - amount * 2,
          type: "DEBIT",
          comment,
        },
      };
      fetch(`/kisan/AddTransaction/${id}`, {
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
      history.push(`/kisanDetails/${id}`);
    }, 2000);
  };

  const handleEdit = () => {
    if (isFormValid()) {
      const formData = {
        transactionNumber,
        comment,
      };
      fetch(`/kisan/editTransaction/${id}`, {
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
          throw new error("Somethign Went Wrong", error);
        });
    } else {
      setHasError(true);
    }
  };
  return (
    <div>
      <h2 className="text-center text-secondary mt-3">Debit Entry</h2>
      <div>
        <div>
          <Kisanmoneysummary kisan={kisan} />
        </div>
        <div></div>
      </div>
      <Form onSubmit={(e) => submit(e)} className="p-3">
        {/*  {hasError && <Alert color="danger"> FORM HAS AN ERROR </Alert>} */}
        <FormGroup className="mt-2">
          <Label for="amount"> Amount </Label>
          <Input
            disabled={type === "edit" ? true : false}
            invalid={amount <= 0 && isAmountValid === ""}
            name="amount"
            type="number"
            value={amount.toString()}
            onWheel={(e) => e.target.blur()}
            onChange={(e) => amountChange(e)}
          />
          <FormFeedback> Amount should be greater than 0</FormFeedback>
        </FormGroup>
        <FormGroup className="mt-2">
          <Label for="comment"> Comment</Label>
          <Input
            invalid={comment.length <= 0 && isCommentValid === ""}
            name="comment"
            type="text"
            value={comment}
            onWheel={(e) => e.target.blur()}
            onChange={(e) => commentChange(e)}
          />
          <FormFeedback> Comment is required</FormFeedback>
        </FormGroup>
        {type === "add" ? (
          <React.Fragment>
            <Button type="submit" color="primary" className="mt-3">
              Create a Debit Entry
            </Button>
            <Button
              type="reset"
              color="danger"
              className="ms-1 mt-3"
              onClick={clear}
            >
              Reset
            </Button>
          </React.Fragment>
        ) : (
          <Button
            type="button"
            color="primary"
            className="mt-3"
            onClick={handleEdit}
          >
            Edit a Debit Entry
          </Button>
        )}
        {showAlert ? (
          type === "add" ? (
            <Alert className="mt-4">Debit Entry been added successfully</Alert>
          ) : (
            <Alert className="mt-4">
              Debit Entry has been Edited successfully
            </Alert>
          )
        ) : (
          ""
        )}
      </Form>
    </div>
  );
};

export default Debitform;
