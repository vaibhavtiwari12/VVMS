import React from "react";
import { FormattedMessage } from "react-intl";
import { Table } from "reactstrap";

const Inventorysummary = ({inventory}) => {
  return (
    <div className="p-3">
      {inventory && 
      
      <Table bordered responsive className="p-3 kisan-detail">
        <tbody>
          <tr>
            <th>
              Total Weight Available(in KGs)
            </th>
            <td className="capitalize">{inventory.totalWeight}</td>
          </tr>
          <tr>
            <th>
              Total Number of Bags Available
            </th>
            <td className="capitalize">{inventory.totalBags}</td>
          </tr>
        </tbody>
      </Table>
      }
    </div>

  );
};
export default Inventorysummary;
