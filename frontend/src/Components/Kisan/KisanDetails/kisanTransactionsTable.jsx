import React from "react";
import { Table } from "reactstrap";

const Kisantransactionstable = ({ kisan }) => {
  const dateConverter = (date) => {
    const D = new Date(date);
    const formattedDate = `${D.getDate()}/${D.getMonth()+1}/${D.getFullYear()} ${D.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric',second:"numeric",  hour12: true })}`
    return formattedDate;
  }
  return (
    <div>
      <Table bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Date</th>
            <th>Comment</th>
            <th>Credit</th>
            <th>Debit</th>
            <th>Balance</th> 
          </tr>
        </thead>
        <tbody>
          {kisan && kisan.transactions ? kisan.transactions.map((transaction,index) => {
            return (
              <tr>
                <th scope="row">{index+1}</th>
                <td>{dateConverter(transaction.date)}</td>
                <td>{transaction.comment}</td>
                <td>{transaction.type==="CREDIT" ? transaction.transactionAmount : ""}</td>
                <td>{transaction.type==="DEBIT" ? transaction.transactionAmount : ""}</td>
                <td>{transaction.balanceAfterThisTransaction}</td>
              </tr> 
            );
          }):""}
        </tbody>
      </Table>
    </div>
  );
};

export default Kisantransactionstable;
