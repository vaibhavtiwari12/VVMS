import React from "react";
import { Table } from "reactstrap";

const Kisanmoneysummary = ({ kisan }) => {
  return (
    <div className="p-3">
      <Table bordered responsive className="p-3 kisan-detail">
        <tbody>
          <tr>
            <th>Name</th>
            <td>{kisan.name}</td>
          </tr>
          <tr>
            <th>Father's Name</th>
            <td>{kisan.fatherName}</td>
          </tr>
          <tr>
            <th>Phone Number</th>
            <td>{kisan.phone}</td>
          </tr>
          <tr>
            <th>Address</th>
            <td>{kisan.address}</td>
          </tr>
          <tr>
            <th>Balance</th>
            <td>{kisan.balance}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default Kisanmoneysummary;
