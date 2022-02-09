import React, { Fragment } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Table } from "reactstrap";
import { useReactToPrint } from "react-to-print";
import Kisanreceipt from "./KisanReceipt";
import { useRef } from "react";
import { dateConverter } from "../../../Utility/utility";
import Kisancreditreceipt from "./KisanCreditReceipt";
import { FormattedMessage } from "react-intl";

const Kisantransactionstable = ({ kisan }) => {
  /* const [balances, setBalances] = useState([]); */
  const [transaction, setTransaction] = useState({});

  const componentRef = useRef();
  const creditPrintRef = useRef();
  const print = (currentTransaction) => {
    setTransaction({
      address: kisan.address,
      balance: kisan.balance,
      fatherName: kisan.fatherName,
      name: kisan.name,
      phone: kisan.phone,
      date: dateConverter(currentTransaction.date),
      transactionAmount: currentTransaction.transactionAmount,
      type: "DEBIT",
    });
  };
  const printCreditEntry = (currentTransaction) => {
    console.log("Idhar");
    setTransaction({
      address: kisan.address,
      balance: kisan.balance,
      fatherName: kisan.fatherName,
      name: kisan.name,
      phone: kisan.phone,
      txn_id: currentTransaction._id,
      txn_date: dateConverter(currentTransaction.date),
      txn_previousBillSettlementAmount:
        currentTransaction.previousBillSettlementAmount,
      txn_numberofBags: currentTransaction.numberofBags,
      txn_totalWeight: currentTransaction.totalweight,
      txn_rate: currentTransaction.rate,
      txn_grossTotal: currentTransaction.grossTotal,
      txn_commission: currentTransaction.commission,
      txn_hammali: currentTransaction.hammali,
      txn_bhada: currentTransaction.bhada,
      txn_netTotal: currentTransaction.netTotal,
      txn_advanceSettlement: currentTransaction.advanceSettlement,
      txn_carryForwardFromThisEntry:
        currentTransaction.carryForwardFromThisEntry,
      txn_paidToKisan: currentTransaction.paidToKisan,
    });
  };
  useEffect(() => {
    if (Object.keys(transaction).length > 0) {
      if (transaction && transaction.type === "DEBIT") {
        handlePrint();
      } else {
        handlePrintCreditEntry();
      }
    }
  }, [transaction]);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
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
      <Table  striped  bordered responsive size="sm" className="shadow">
        <thead>
          <tr>
            <th>#</th>
            <th>
              <FormattedMessage id="date" />
            </th>
            <th>
              <FormattedMessage id="comment" />
            </th>
            <th>
              <FormattedMessage id="advanceDebited" />
            </th>
            <th>
               <FormattedMessage id="grossTotalWithCurrency" />
            </th>
            <th>
              <FormattedMessage id="billTotal" />
            </th>
            <th>
              <FormattedMessage id="advanceCredited" />
            </th>
            <th>
              <FormattedMessage id="cashPaid" />
            </th>
            <th>
              <FormattedMessage id="carryForward" />
            </th>
            <th>
              <FormattedMessage id="balance" />
            </th>
            <th>
              <FormattedMessage id="actions" />
            </th>
          </tr>
        </thead>
        <tbody>
          {kisan &&
            kisan.transactions &&
            kisan.transactions
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .map((transaction, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{dateConverter(transaction.date)}</td>
                    <td>{transaction.comment}</td>
                    <td>
                      {transaction.type === "DEBIT"
                        ? transaction.transactionAmount
                        : ""}
                    </td>
                    <td>{transaction.grossTotal}</td>
                    <td>{transaction.netTotal}</td>
                    
                    <td>
                     {transaction.type === "CREDIT"
                        ? transaction.advanceSettlement
                        : transaction.type === "ADVANCESETTLEMENT"
                        ? transaction.transactionAmount
                        : ""}
                    </td>
                    
                    <td>{transaction.paidToKisan}</td>
                    <td>{transaction.carryForwardFromThisEntry}</td>
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
                    <td>
                      {transaction.type === "DEBIT" ? (
                        <div>
                          <Button color="success">
                            <Link
                              className="link-no-decoration"
                              to={`/kisanDebitForm/${kisan._id}/edit/${transaction._id}`}
                            >
                              <FormattedMessage id="editButtonText" />
                            </Link>
                          </Button>
                          <Button
                            className="ms-2"
                            color="primary"
                            onClick={(e) => print(transaction)}
                          >
                            <FormattedMessage id="printButtonText" />
                          </Button>
                        </div>
                      ) : transaction.type === "ADVANCESETTLEMENT" ? (
                        <div>
                          <Button color="success">
                            <Link
                              className="link-no-decoration"
                              to={`/kisanAdvanceSettlement/${kisan._id}/edit/${transaction._id}`}
                            >
                              <FormattedMessage id="editButtonText" />
                            </Link>
                          </Button>
                          <Button
                            className="ms-2"
                            color="primary"
                            onClick={(e) => print(transaction)}
                          >
                            <FormattedMessage id="printButtonText" />
                          </Button>
                        </div>
                      ) : (
                        <div>
                          <Button color="secondary">
                            <Link
                              className="link-no-decoration"
                              to={`/kisanCreditForm/${kisan._id}/edit/${transaction._id}`}
                            >
                              <FormattedMessage id="viewButtonText" />
                            </Link>
                          </Button>
                          <Button
                            className="ms-2"
                            color="primary"
                            onClick={(e) => printCreditEntry(transaction)}
                          >
                            <FormattedMessage id="printButtonText" />
                          </Button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
        </tbody>
      </Table>
      <div className="hide-till-print">
        <Kisanreceipt data={transaction} ref={componentRef} />
      </div>
      <div className="hide-till-print">
        <Kisancreditreceipt data={transaction} ref={creditPrintRef} />
      </div>
    </div>
  );
};

export default Kisantransactionstable;
