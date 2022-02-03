import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "reactstrap";
import { getKisanByID } from "../../../Utility/utility";
import Kisanmoneysummary from "./KisanMoneySummary";
import Kisantransactionstable from "./kisanTransactionsTable";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";



const Kisandetails = () => {
  const { id } = useParams();
  const [kisan, setKisan] = useState({});

  useEffect(() => {
      console.log(id)
    try {
      const fetchData = async () => {
        setKisan(await getKisanByID(id));
      };
      fetchData();
    } catch (e) {
      throw new Error("Something Went Wrong ", e);
    }
  }, []);
  useEffect(() => {
      console.log("KISAN ", kisan)
     
  }, [kisan]);
  return (
    <div>
      <h2 className="d-flex justify-content-center mt-2 capitalize"><FormattedMessage id="kisanDetailsTitle"/></h2>
      <div>
        <div>
          <Kisanmoneysummary kisan={kisan}></Kisanmoneysummary>
        </div>
        <div></div>
      </div>
      <div className="text-center">
          <Button color="primary"><Link className="link-no-decoration" to={`/kisanDebitForm/${id}/add`}><FormattedMessage id="debitEntryKisanButtonText"/></Link></Button>
          <Button color="primary" className="ms-3"><Link className="link-no-decoration" to={`/kisanCreditForm/${id}/add`}><FormattedMessage id="creditEntryKisanButtonText"/></Link></Button>
      </div>
      <h3 className="text-center mt-4"><FormattedMessage id="transactionDetailsTitle"/></h3>
      <div className="p-3">
      <Kisantransactionstable kisan={kisan}/>
      </div>
    </div>
  );
};

export default Kisandetails;
