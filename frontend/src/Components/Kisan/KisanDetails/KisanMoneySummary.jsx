import React from "react";
import { Table } from "reactstrap";

const Kisanmoneysummary = ({ kisan }) => {
  return (
    <div className="p-3">
      <Table bordered responsive className="p-3 kisan-detail">
        <tbody>
          <tr>
            <th>Name</th>
            <td className="capitalize">{kisan.name}</td>
          </tr>
          <tr>
            <th>Father's Name</th>
            <td className="capitalize">{kisan.fatherName}</td>
          </tr>
          <tr>
            <th>Phone Number</th>
            <td>{kisan.phone}</td>
          </tr>
          <tr>
            <th>Address</th>
            <td className="capitalize">{kisan.address}</td>
          </tr>
          <tr>
            <th>Advance Balance</th>
            <td>{kisan.balance}</td>
          </tr>
          <tr>
            <th>Carry Forward up to Last Bill</th>
            <td>{kisan.carryForwardAmount}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default Kisanmoneysummary;
