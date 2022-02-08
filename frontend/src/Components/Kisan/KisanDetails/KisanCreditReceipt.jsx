import React from "react";
import { Table } from "reactstrap";
import { dateConverter } from "../../../Utility/utility";
const Kisancreditreceipt = React.forwardRef((props, ref) => {
  /* console.log("props", props); */
  return (
    <div ref={ref} className="mt-3 ms-5 me-5 mb-3" >
      <h6 className="text-center text-success">|| श्री गुरु कृपा ||</h6>
      <h1 className="text-center text-danger text-shadow-im">IM</h1>
      <h1 className="text-center text-danger text-shadow-im underline m-2">
        <u className="company-heading">महाराज वेजिटेबल कंपनी</u>
      </h1>
      <h5 className="text-center text-success">
        धनिया, टमाटर, मटर एवं सब्जी के आढ़ती{" "}
      </h5>
      <hr />
      <h6 className="text-center text-danger">
        <b>दु. न. 35 कृषि उपज मंडी, जबलपुर (म. प्र.)</b>
      </h6>
      <hr />
      <div className="ps-1">
        <Table size="sm" borderless>
          <tbody>
            <tr>
              <th>नाम</th>
              <td>{props.data.name}</td>
              <th>बिल क्रमांक </th>
              <td>{props.data.txn_id}</td>
            </tr>
            <tr>
              <th>पिता का नाम </th>
              <td>{props.data.fatherName}</td>
              <th>दिनांक </th>
              <td>{props.data.txn_date}</td>
            </tr>
            <tr>
              <th>पता</th>
              <td>{props.data.address}</td>
            </tr>
            <tr>
              <th>फ़ोन </th>
              <td>{props.data.phone}</td>
            </tr>
          </tbody>
        </Table>
      </div>
      <hr />
      <div className="">
        <Table>
          <tbody>
            <tr>
              <td className="fill-row">
                <b>पुराने बिल से बची राशि</b>
              </td>
              <td>
                <b>{props.data.txn_previousBillSettlementAmount}</b>
              </td>
            </tr>

            <tr>
              <td className="fill-row">
                <b>खरीदारी का बेयौरा</b>
              </td>
              <td></td>
            </tr>
            <tr className="no-border">
              <td className="fill-row p-2">&nbsp; &nbsp;नग/बोरा </td>
              <td>{props.data.txn_numberofBags}</td>
            </tr>
            <tr className="no-border">
              <td className="fill-row p-2">&nbsp; &nbsp;कुल वजन </td>
              <td>{props.data.txn_totalWeight}</td>
            </tr>
            <tr>
              <td className="fill-row p-2">&nbsp; &nbsp;रेट </td>
              <td>{props.data.txn_rate}</td>
            </tr>
            <tr>
              <td className="fill-row">
                <b>खरीदारी का कुल योग</b>
              </td>
              <td>
                <b>{props.data.txn_grossTotal}</b>
              </td>
            </tr>

            <tr>
              <td className="fill-row">
                <b>कटौती</b>
              </td>
              <td></td>
            </tr>
            <tr className="no-border">
              <td className="fill-row p-2">&nbsp; &nbsp;कमीशन </td>
              <td>
                {(props.data.txn_commission / 100) * props.data.txn_grossTotal}
              </td>
            </tr>
            <tr className="no-border">
              <td className="fill-row p-2">&nbsp; &nbsp;हम्माली</td>
              <td>{props.data.txn_hammali}</td>
            </tr>
            <tr>
              <td className="fill-row p-2">&nbsp; &nbsp;भाड़ा </td>
              <td>{props.data.txn_bhada}</td>
            </tr>
            <tr>
              <td className="fill-row">
                <b>कटौती के बाद कुल योग </b>
              </td>
              <td>
                <b>{props.data.txn_netTotal}</b>
              </td>
            </tr>
            <tr>
              <td className="fill-row">
                <b>पुराने बिल से बची राशि + कटौती के बाद कुल योग </b>
              </td>
              <td>
                <b>
                  {props.data.txn_netTotal +
                    props.data.txn_previousBillSettlementAmount}
                </b>
              </td>
            </tr>

            <tr>
              <td className="fill-row">
                <b>समायोजन </b>
              </td>
              <td></td>
            </tr>
            <tr className="no-border">
              <td className="fill-row p-2">
                &nbsp; &nbsp;एडवांस का भुगतान (एडवांस की बकाया राशि:{" "}
                {props.data.balance})
              </td>
              <td>{props.data.txn_advanceSettlement}</td>
            </tr>
            <tr>
              <td className="fill-row p-2">
                &nbsp; &nbsp;बकाया (अगले बिल में समायोजन हेतु){" "}
              </td>
              <td>{props.data.txn_carryForwardFromThisEntry}</td>
            </tr>
            <tr>
              <td className="fill-row p-2">
                &nbsp; &nbsp;<b>कैश भुगतान</b>
              </td>
              <td>
                <b>{props.data.txn_paidToKisan}</b>
              </td>
            </tr>
          </tbody>
        </Table>
            <div className="text-end pt-4"><span>हस्ताक्षर</span></div>
      </div>
    </div>
  );
});

export default Kisancreditreceipt;
