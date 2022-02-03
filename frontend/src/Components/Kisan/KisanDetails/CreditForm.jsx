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
import { FormattedMessage } from "react-intl";



const CreditForm = () => {
  const { id, type, transactionNumber } = useParams();

  //Form States
  const [comment, setComment] = useState("");
  const [previousBillSettlementAmount, setPreviousBillSettlementAmount] =
    useState(0);
  const [numberofBags, setNumberOfBags] = useState(0);
  const [totalweight, setTotalweight] = useState(0);
  const [rate, setRate] = useState(0);
  const [grossTotal, setGrossTotal] = useState(0);
  const [commission, setCommission] = useState(5);
  const [hammali, setHammali] = useState(0);
  const [bhada, setBhada] = useState(0);
  const [netTotal, setNetTotal] = useState(0);
  const [paidToKisan, setPaidToKisan] = useState(0);
  const [advanceSettlement, setAdvanceSettlement] = useState(0);
  const [carryForwardFromThisEntry, setCarryForwardFromThisEntry] = useState(0);

  // Validity States
  const [isCommentValid, setIsCommentValid] = useState("PRISTINE");
  const [
    isPreviousBillSettlementAmountValid,
    setIsPreviousBillSettlementAmountValid,
  ] = useState("PRISTINE");
  const [isNumberofBagsValid, setIsNumberofBagsValid] = useState("PRISTINE");
  const [isTotalWeigthValid, setIsTotalWeigthValid] = useState("PRISTINE");
  const [isRateValid, setIsRateValid] = useState("PRISTINE");
  const [isCommissionValid, setIsCommissionValid] = useState("PRISTINE");
  const [isHammalivalid, setIsHammalivalid] = useState("PRISTINE");
  const [isBhadaValid, setIsBhadaValid] = useState("PRISTINE");
  const [isPaidToKisanValid, setIsPaidToKisanValid] = useState("PRISTINE");
  const [isAdvanceSettlementValid, setIsAdvanceSettlementValid] =
    useState("PRISTINE");
  const [
    isCarryForwardFromThisEntryValid,
    setIsCarryForwardFromThisEntryValid,
  ] = useState("PRISTINE");

  //Misclaeneous
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

  // calculate gross total
  useEffect(() => {
    if (type === "add") {
      setGrossTotal(rate * totalweight);
    }
  }, [rate, totalweight]);

  useEffect(() => {
    if (type === "add") {
      setNetTotal(
        grossTotal - (commission / 100) * grossTotal - hammali - bhada
      );
    }
  }, [grossTotal, commission, hammali, bhada]);

  useEffect(() => {
    if (type === "add") {
      setPaidToKisan(
        netTotal - advanceSettlement + previousBillSettlementAmount
      );
    }
  }, [advanceSettlement, netTotal, previousBillSettlementAmount]);

  useEffect(() => {
    if (type === "add") {
      setCarryForwardFromThisEntry(
        netTotal -
          advanceSettlement -
          paidToKisan +
          previousBillSettlementAmount
      );
    }
  }, [paidToKisan, advanceSettlement, netTotal]);

  /*
   */

  useEffect(() => {
    if (Object.keys(kisan).length > 0) {
      setPreviousBillSettlementAmount(kisan.carryForwardAmount);
    }
  }, [kisan]);

  //EDIT
  useEffect(() => {
    if (transactionNumber && Object.keys(kisan).length > 0) {
      const transactionToedit = kisan.transactions.filter(
        (transac) => transac._id === transactionNumber.toString()
      )[0];

      console.log("transactionToedit", transactionToedit);
      setPreviousBillSettlementAmount(
        transactionToedit.previousBillSettlementAmount
      );
      setNumberOfBags(transactionToedit.numberofBags);
      setTotalweight(transactionToedit.totalweight);
      setRate(transactionToedit.rate);
      setGrossTotal(transactionToedit.grossTotal);
      setCommission(transactionToedit.commission);
      setHammali(transactionToedit.hammali);
      setBhada(transactionToedit.bhada);
      setNetTotal(transactionToedit.netTotal);
      setAdvanceSettlement(transactionToedit.advanceSettlement);
      setPaidToKisan(transactionToedit.paidToKisan);
      setComment(transactionToedit.comment);
      setCarryForwardFromThisEntry(transactionToedit.carryForwardFromThisEntry);
    }
  }, [kisan]);

  const isFormValid = () => {
    let isInvalid = false;
    if (comment.length <= 0) {
      setIsCommentValid("");
      isInvalid = true;
    }
    if (numberofBags < 0) {
      setIsNumberofBagsValid("");
      isInvalid = true;
    }
    if (totalweight < 0) {
      setIsTotalWeigthValid("");
      isInvalid = true;
    }
    if (rate < 0) {
      setIsRateValid("");
      isInvalid = true;
    }
    if (commission <= 0) {
      setIsCommissionValid("");
      isInvalid = true;
    }
    if (hammali < 0) {
      setIsHammalivalid("");
      isInvalid = true;
    }
    if (bhada < 0) {
      setIsBhadaValid("");
      isInvalid = true;
    }
    if (advanceSettlement < 0) {
      setIsAdvanceSettlementValid("");
      isInvalid = true;
    }
    if (advanceSettlement > Math.abs(kisan.balance)) {
      setIsAdvanceSettlementValid("OUTSTANDINGEXCEEDED");
      isInvalid = true;
    }
    if (advanceSettlement > previousBillSettlementAmount + netTotal) {
      setIsAdvanceSettlementValid("TOTALEXCEEDED");
      isInvalid = true;
    }
    if (paidToKisan < 0) {
      setIsPaidToKisanValid("");
      isInvalid = true;
    }
    if (paidToKisan > previousBillSettlementAmount + netTotal) {
      setIsPaidToKisanValid("TOTALEXCEEDED");
      isInvalid = true;
    }
    return isInvalid ? false : true;
  };

  const validateAdvanceSettlement = () => {
    setIsAdvanceSettlementValid("PRISTINE");
    if (advanceSettlement < 0) {
      setIsAdvanceSettlementValid("");
    } else if (
      previousBillSettlementAmount + netTotal > Math.abs(kisan.balance) &&
      advanceSettlement > Math.abs(kisan.balance)
    ) {
      setIsAdvanceSettlementValid("OUTSTANDINGEXCEEDED");
    } else if (advanceSettlement > previousBillSettlementAmount + netTotal) {
      setIsAdvanceSettlementValid("TOTALEXCEEDED");
    }
  };

  const validatePaidToKisan = () => {
    setIsPaidToKisanValid("PRISTINE");
    if (paidToKisan < 0) {
      setIsPaidToKisanValid("");
    } else if (paidToKisan > previousBillSettlementAmount + netTotal) {
      setIsPaidToKisanValid("TOTALEXCEEDED");
    }
  };

  const history = useHistory();

  // ------------------------------------------------Change Functions ------------------------------------------

  const commentChange = (e) => {
    setComment(e.target.value);
    setIsCommentValid("");
  };

  const previousBillSettlementAmountChange = (e) => {
    setPreviousBillSettlementAmount(e.target.value);
    setIsPreviousBillSettlementAmountValid("");
  };
  const numberofBagsChange = (e) => {
    setNumberOfBags(e.target.value);
    setIsNumberofBagsValid("");
  };
  const totalWeightChange = (e) => {
    setTotalweight(e.target.value);
    setIsTotalWeigthValid("");
  };
  const rateChange = (e) => {
    setRate(e.target.value);
    setIsRateValid("");
  };
  const commisionChange = (e) => {
    setCommission(e.target.value);
    setIsCommissionValid("");
  };
  const hammaliChange = (e) => {
    setHammali(e.target.value);
    setIsHammalivalid("");
  };
  const bhadaChange = (e) => {
    setBhada(e.target.value);
    setIsBhadaValid("");
  };
  const paidToKisanChange = (e) => {
    setPaidToKisan(e.target.value);
  };
  const advanceSettlementChange = (e) => {
    setAdvanceSettlement(e.target.value);
  };
  const carryForwardFromThisEntryChange = (e) => {
    setCarryForwardFromThisEntry(e.target.value);
    setIsCarryForwardFromThisEntryValid("");
  };
  useEffect(() => {
    validateAdvanceSettlement();
  }, [advanceSettlement]);

  useEffect(() => {
    validatePaidToKisan();
  }, [paidToKisan]);

  // ------------------------------------------------Change Functions ------------------------------------------

  const clear = () => {
    //setAmount("");
    setComment("");
    setNumberOfBags(0);
    setTotalweight(0);
    setRate(0);
    setGrossTotal(0);
    setCommission(5);
    setHammali(0);
    setBhada(0);
    setNetTotal(0);
    setPaidToKisan(previousBillSettlementAmount);
    setAdvanceSettlement(0);
    setCarryForwardFromThisEntry(0);
    setHasError(false);
    setIsCommentValid("PRISTINE");
    setIsPreviousBillSettlementAmountValid("PRISTINE");
    setIsNumberofBagsValid("PRISTINE");
    setIsTotalWeigthValid("PRISTINE");
    setIsRateValid("PRISTINE");
    setIsCommentValid("PRISTINE");
    setIsHammalivalid("PRISTINE");
    setIsBhadaValid("PRISTINE");
    setIsPaidToKisanValid("PRISTINE");
    setIsAdvanceSettlementValid("PRISTINE");
    setIsCarryForwardFromThisEntryValid("PRISTINE");
  };

  const submit = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      const formData = {
        transaction: {
          previousBillSettlementAmount,
          grossTotal,
          netTotal,
          numberofBags,
          totalweight,
          rate,
          commission,
          hammali,
          bhada,
          paidToKisan,
          advanceSettlement,
          carryForwardFromThisEntry,
          type: "CREDIT",
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


  /*------------------------------------------HTML-------------------------------------*/

  return (
    <div>
      <h2 className="text-center text-secondary mt-3"><FormattedMessage id="creditEntryKisanButtonText"/></h2>
      <div>
        <div>
          <Kisanmoneysummary kisan={kisan} />
        </div>
        <div></div>
      </div>
      <Form onSubmit={(e) => submit(e)} className="p-3">
      <h2 className="text-center text-secondary mt-3"><FormattedMessage id="billDetails"/></h2>
        <FormGroup className="mt-2">
          <Label for="previousBillSettlementAmount">
            <FormattedMessage id="carryForwardAmount"/>
          </Label>{" "}
          <Input
            disabled
            name="previousBillSettlementAmount"
            type="number"
            value={previousBillSettlementAmount}
            onWheel={(e) => e.target.blur()}
            onChange={(e) => previousBillSettlementAmountChange(e)}
          />
          <FormFeedback>
            {" "}
            Previous Bill Settlement Amount is required.{" "}
          </FormFeedback>{" "}
        </FormGroup>{" "}
        <div className="shadow p-3 mt-3">
          <h4 className="text-secondary"><FormattedMessage id="purchaseSectionTitle"/></h4>
          <FormGroup className="mt-2">
            <Label for="numberofBags"><FormattedMessage id="numberOfBags"/></Label>{" "}
            <Input
              disabled={type === "edit" ? true : false}
              invalid={
                numberofBags && numberofBags < 0 && isNumberofBagsValid === ""
              }
              onWheel={(e) => e.target.blur()}
              name="numberofBags"
              type="number"
              value={numberofBags.toString()}
              onChange={(e) => numberofBagsChange(e)}
            />
            <FormFeedback> Number of Bags cannot be less than 0 </FormFeedback>
          </FormGroup>
          <FormGroup className="mt-2">
            <Label for="totalweight"><FormattedMessage id="totalWeight"/></Label>{" "}
            <Input
              disabled={type === "edit" ? true : false}
              invalid={
                totalweight && totalweight < 0 && isTotalWeigthValid === ""
              }
              onWheel={(e) => e.target.blur()}
              name="totalweight"
              type="number"
              value={totalweight.toString()}
              onChange={(e) => totalWeightChange(e)}
            />
            <FormFeedback> Weigth cannot be less than 0 </FormFeedback>{" "}
          </FormGroup>
          <FormGroup className="mt-2">
            <Label for="rate"><FormattedMessage id="ratePerKg"/></Label>
            <Input
              disabled={type === "edit" ? true : false}
              invalid={rate && rate < 0 && isRateValid === ""}
              name="rate"
              type="number"
              value={rate.toString()}
              onChange={(e) => rateChange(e)}
              onWheel={(e) => e.target.blur()}
            />
            <FormFeedback>Rate cannot be less than 0.</FormFeedback>
            <div className="text-end mt-3">
              <h5><FormattedMessage id="grossTotal"/> {grossTotal}</h5>
            </div>
          </FormGroup>
        </div>
        <div className="shadow p-3 mt-3">
          <h4 className="text-secondary"><FormattedMessage id="deductionsSectionTitle"/></h4>
          <FormGroup className="mt-2">
            <Label for="commission">
              {" "}
              <FormattedMessage id="commission"/> - <b><FormattedMessage id="totalCommission"/> {" "}
              <span className="text-primary">{grossTotal * (commission / 100)}</span></b>
            </Label>{" "}
            <Input
              disabled={type === "edit" ? true : false}
              invalid={
                commission && commission <= 0 && isCommissionValid === ""
              }
              onWheel={(e) => e.target.blur()}
              name="commission"
              type="number"
              value={commission.toString()}
              onChange={(e) => commisionChange(e)}
            />
            <FormFeedback> Commission cannot be 0 or less. </FormFeedback>{" "}
          </FormGroup>
          <FormGroup className="mt-2">
            <Label for="hammali"> <FormattedMessage id="hammali"/></Label>{" "}
            <Input
              disabled={type === "edit" ? true : false}
              invalid={hammali && hammali <= 0 && isHammalivalid === ""}
              onWheel={(e) => e.target.blur()}
              name="hammali"
              type="number"
              value={hammali.toString()}
              onChange={(e) => hammaliChange(e)}
            />
            <FormFeedback> Hammali cannot be less than 0.</FormFeedback>{" "}
          </FormGroup>
          <FormGroup className="mt-2">
            <Label for="bhada"><FormattedMessage id="bhada"/></Label>
            <Input
              disabled={type === "edit" ? true : false}
              invalid={bhada && bhada <= 0 && isBhadaValid === ""}
              name="bhada"
              type="number"
              onWheel={(e) => e.target.blur()}
              value={bhada.toString()}
              onChange={(e) => bhadaChange(e)}
            />
            <FormFeedback>Bhada cannot be less than 0. </FormFeedback>
            <div className="text-end mt-3">
              <h5><FormattedMessage id="netTotal"/>  {netTotal}</h5>
            </div>
          </FormGroup>
        </div>
        <div className="shadow p-3 mt-3">
          <div>
            <h4 className="text-secondary"><FormattedMessage id="settlementSectionTitle"/></h4>
            <h6>
              <FormattedMessage id="netTotal"/> ({netTotal}) + <FormattedMessage id="carryForwardAmount"/> (
              {previousBillSettlementAmount}) = {" "}
              <b><span className="text-primary">{netTotal + previousBillSettlementAmount}</span></b>
            </h6>
          </div>
          <FormGroup className="mt-2">
            <Label for="advanceSettlement">
              {" "}
              <FormattedMessage id="advanceCredited"/> - <b><FormattedMessage id="balance"/> :{" "}
              <span className="text-primary">{kisan.balance}</span></b>
            </Label>{" "}
            <Input
              disabled={type === "edit" || kisan.balance === 0 ? true : false}
              invalid={
                isAdvanceSettlementValid === "OUTSTANDINGEXCEEDED" ||
                isAdvanceSettlementValid === "TOTALEXCEEDED" ||
                isAdvanceSettlementValid === ""
              }
              onWheel={(e) => e.target.blur()}
              name="advanceSettlement"
              type="number"
              value={advanceSettlement}
              onChange={(e) => advanceSettlementChange(e)}
            />
            <FormFeedback>
              {isAdvanceSettlementValid === "" ? (
                <span>Advance Settlement Cannot be less than 0.</span>
              ) : isAdvanceSettlementValid === "OUTSTANDINGEXCEEDED" ? (
                <span>
                  Advance cannot be more than {Math.abs(kisan.balance)}
                </span>
              ) : (
                <span>
                  Advance cannot be more than the Current Bill Amount :{" "}
                  {netTotal + previousBillSettlementAmount}.
                </span>
              )}{" "}
            </FormFeedback>{" "}
          </FormGroup>
          <FormGroup className="mt-2">
            <Label for="paidToKisan"> <FormattedMessage id="cashPaid"/></Label>{" "}
            <Input
              disabled={type === "edit" ? true : false}
              invalid={
                isPaidToKisanValid === "" ||
                isPaidToKisanValid === "TOTALEXCEEDED"
              }
              name="paidToKisan"
              type="number"
              onWheel={(e) => e.target.blur()}
              value={paidToKisan.toString()}
              onChange={(e) => paidToKisanChange(e)}
            />
            <FormFeedback>
              {isPaidToKisanValid === "TOTALEXCEEDED" ? (
                <span>Cash paid cannot be greater than Bill Amount</span>
              ) : (
                <span>Cash paid cannot be less than 0.</span>
              )}
            </FormFeedback>{" "}
          </FormGroup>
          <FormGroup className="mt-2">
            <Label for="carryForwardFromThisEntry">
              <FormattedMessage id="carryForward"/>
            </Label>{" "}
            <Input
              disabled
              name="carryForwardFromThisEntry"
              type="number"
              onWheel={(e) => e.target.blur()}
              value={carryForwardFromThisEntry.toString()}
              onChange={(e) => carryForwardFromThisEntryChange(e)}
            />
            <FormFeedback> Paid To Kisan is required. </FormFeedback>{" "}
          </FormGroup>
        </div>
        <FormGroup className="mt-2">
          <Label for="comment"> <FormattedMessage id="comment"/></Label>{" "}
          <Input
            invalid={comment.length <= 0 && isCommentValid === ""}
            name="comment"
            type="text"
            value={comment}
            onChange={(e) => commentChange(e)}
          />{" "}
          <FormFeedback> Comment is required</FormFeedback>{" "}
        </FormGroup>{" "}
        {type === "add" ? (
          <React.Fragment>
            <Button type="submit" color="primary" className="mt-3">
              Create a Credit Entry
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
            Edit a Credit Entry
          </Button>
        )}
        {showAlert ? (
          type === "add" ? (
            <Alert className="mt-4">Credit Entry been added successfully</Alert>
          ) : (
            <Alert className="mt-4">
              Credit Entry has been Edited successfully
            </Alert>
          )
        ) : (
          ""
        )}
      </Form>
    </div>
  );
};

export default CreditForm;
