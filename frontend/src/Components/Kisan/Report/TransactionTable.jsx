import React, { Fragment } from "react";
import { Button, Table } from "reactstrap";
import { dateConverter } from "../../../Utility/utility";

const Transactiontable = ({ transactionSummary }) => {
  return (
    <div className="p-3">
      <h3 className="text-center">Transactions in the Date</h3>
      
      <div className="pt-4">
        <Table bordered hover responsive  size="sm">
          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Comment</th>
              <th>Advance Taken</th>
              <th>Particulars</th>
              <th>Bill Total</th>
              <th>Advance Paid</th>
              <th>Cash Paid</th>
              <th>Carry Forward</th>
            </tr>
          </thead>
          <tbody>
            {transactionSummary && transactionSummary.length > 0
              ? transactionSummary.sort((a,b)=>a.date<b.date ? 1 : -1).map((transaction, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{transaction.name}</th>
                      <td>{dateConverter(transaction.date)}</td>
                      <td>{transaction.comment}</td>
                      <td>{transaction.transactionAmount}</td>

                      <td>
                        {transaction.type ==="CREDIT" ? (
                            <Fragment>
                            <table bordered>
                              <tr>
                                <td>Bags</td> 
                                <td>{transaction.numberofBags}</td>
                              </tr>
                              <tr>
                                <td>Weigth</td> 
                                <td>{transaction.totalweight}</td>
                              </tr>
                              <tr>
                                <td>Rate</td>
                                <td>{transaction.rate}</td>
                              </tr>
                              <tr>
                                <td>Hammali</td>
                                <td>{transaction.hammali}</td>
                              </tr>
                              <tr>
                                <td>Bhada</td> 
                                <td>{transaction.bhada}</td>
                              </tr>
                              <tr>
                                <td>Commission</td>
                                <td>{transaction.commission}</td>
                              </tr>
                            </table>
                            </Fragment>
                        ): ""
                          
                        }
                      </td>
                      <td>{transaction.netTotal}</td>
                      <td>{transaction.advanceSettlement}</td>
                      <td>{transaction.paidToKisan}</td>
                      <td>{transaction.carryForwardFromThisEntry}</td>
                    </tr>
                  );
                })
              : ""}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Transactiontable;
