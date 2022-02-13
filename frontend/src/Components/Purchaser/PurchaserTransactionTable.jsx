import React, { Fragment, useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Table } from "reactstrap";
import { useReactToPrint } from "react-to-print";
import { FormattedMessage } from "react-intl";
import { dateConverter } from "../../Utility/utility";
import PurchaserBill from "./PurchaserBill";

const Purchasertransactiontable = ({ purchaser, purchaserDetails }) => {
  console.log("purchaserDetails",purchaserDetails)
  const [transaction, setTransaction] = useState({});

  const creditPrintRef = useRef();
  const printCreditEntry = (currentTransaction) => {
    console.log("Current Transaction", currentTransaction);
    const transaction = {
      name : purchaserDetails.name,
      balance: purchaserDetails.balance,
      companyName: purchaserDetails.companyName, 
      phone: purchaserDetails.phone,
      address: purchaserDetails.address,
      transaction: currentTransaction.transactions,
      date: currentTransaction.date,
      type:currentTransaction.type,
      oldBalance: calculateBalance(currentTransaction),
      billId: currentTransaction.transactions[currentTransaction.transactions.length-1]._id,
      debitSum: calculateTotals(currentTransaction, "db"),
      creditSum: calculateTotals(currentTransaction, "cr")
    }
    setTransaction({...transaction});
  };
  const calculateTotals =(currentTransaction,type) => {
    let dbSum = 0;
    let crSum = 0;
    if (currentTransaction.transactions.length > 0) {
      currentTransaction.transactions.map((trn) => {
        if (trn.type === "DEBIT") {
          dbSum += trn.transactionAmount;
        } else {
          crSum += trn.transactionAmount;
        }
      });
    }
    if(type ==="db"){
      return dbSum
    }else {
      return crSum
    }
  }
  const calculateBalance = (currentTransaction) => {
    let oldBalance = 0;
    const Index = currentTransaction.transactions.length-1;
    const oldBalanceEntry = currentTransaction.transactions[Index].balanceAfterThisTransaction;
    if(currentTransaction.transactions[Index].type === "CREDIT") {
      oldBalance = oldBalanceEntry - currentTransaction.transactions[Index].transactionAmount; 
    }else {
      oldBalance = oldBalanceEntry + currentTransaction.transactions[Index].transactionAmount; 
    }
    return oldBalance;
  }
  useEffect(() => {
    if (Object.keys(transaction).length > 0) {
      console.log("Transaction ", transaction)
      handlePrintCreditEntry();
    }
  }, [transaction]);
  const handlePrintCreditEntry = useReactToPrint({
    content: () => creditPrintRef.current,
  });
  /*  useEffect(() => {
    let sum = 0;
    if (kisan && kisan.transactions) {
      const tempbalances = kisan.transactions.reverse().map((transaction) => {
        if (transaction.type === "DEBIT") {
          return (sum = sum + transaction.transactionAmount);
        } else {
          return (sum = sum + parseInt(transaction.advanceSettlement));
        }
      });
      setBalances(tempbalances.reverse());
    }
    console.log("balances", balances);
  }, [kisan]); */
  return (
    <div>
      <Table bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>
              <FormattedMessage id="date" />
            </th>
            <th><FormattedMessage id="kisanDetailsTitle" /></th>
            <th><FormattedMessage id="totalWeight" /></th>
            <th><FormattedMessage id="numberOfBags" /></th>
            <th><FormattedMessage id="ratePerKg" /></th>
            <th><FormattedMessage id="purchaseTotal" /></th>
            <th><FormattedMessage id="transactionType"/></th>
            <th><FormattedMessage id="outstandingPaymentADT"/></th>
          </tr>
        </thead>
        <tbody>
          {purchaser.length > 0 &&
            purchaser
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .map((purchaser) => {
                return (
                  <Fragment>
                    <tr className="border  m-2">
                      <td colSpan="9">
                        <div className="d-flex align-items-center">
                          <b>Date : {purchaser.date} </b>
                          <div className="flex-fill d-flex justify-content-end">
                            <Button
                              className="m-2"
                              color="primary"
                              onClick={(e) => printCreditEntry(purchaser)}
                            >
                              Print
                            </Button>
                          </div>
                        </div>
                      </td>
                    </tr>
                    {purchaser &&
                      purchaser.transactions &&
                      purchaser.transactions
                        .sort((a, b) => new Date(b.date) - new Date(a.date))
                        .map((transaction, index) => {
                          return (
                            <tr
                              key={index}
                              className={
                                transaction.type === "CREDIT" ? "bg-light" : ""
                              }
                            >
                              <th scope="row">{index + 1}</th>
                              <td>{dateConverter(transaction.date)}</td>
                              <td>
                                <Link to={"/kisanDetails/" + transaction.kisan}>
                                  {transaction.kisanName}
                                </Link>
                              </td>
                              <td>{transaction.totalweight}</td>
                              <td>{transaction.numberofBags}</td>
                              <td>{transaction.rate}</td>
                              <td>{transaction.transactionAmount}</td>

                              {transaction.type === "CREDIT" ?
                                <td><b><FormattedMessage id="tt_payment" /></b></td>
                              : <td><FormattedMessage id="tt_purchase" /></td>}



                              {/*  <td>{balances[index] <0 ? <span className="text-danger">{balances[index]}</span> : <span className="text-success">{balances[index]}</span> }</td> */}
                              <td>
                                <span
                                  className={
                                    transaction.balanceAfterThisTransaction < 0
                                      ? "text-danger"
                                      : "text-primary"
                                  }
                                >
                                  {transaction.balanceAfterThisTransaction}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                  </Fragment>
                );
              })}
        </tbody>
      </Table>
      <div className="hide-till-print">
        <PurchaserBill data={transaction} ref={creditPrintRef} />
      </div>
    </div>
  );
};

export default Purchasertransactiontable;
