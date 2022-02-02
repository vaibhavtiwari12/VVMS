import React from "react";
import Transactionperiodsummary from "./transactionPeriodSummary";
import Transactiontable from "./TransactionTable";

const Reportprint = React.forwardRef((props, ref) => {
    console.log(props.transactionSummary, props.searchDate)
    const date = new Date(props.searchDate);
  return (
    <div ref={ref}>
        <h2 className="text-center pt-3">REPORT</h2>
      <Transactionperiodsummary
        transactionSummary={props.transactionSummary}
        searchDate={props.searchDate}
      />
      <Transactiontable transactionSummary={props.transactionSummary} />
    </div>
  );
});

export default Reportprint;
