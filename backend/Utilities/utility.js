const { createDBConnection } = require("../Mongo/mongoConnector");
const Kisan = require("../Schema/kisanSchema");
const monthToNumberMapping = {
  "01": {
    name: "January",
    number: "01"
  },
  "02": {
    name: "February",
    number: "02"
  },
  "03": {
    name: "March",
    number: "03"
  },
  "04": {
    name: "April",
    number: "04"
  },
  "05": {
    name: "May",
    number: "01"
  },
  "06": {
    name: "June",
    number: "01"
  },
  "07": {
    name: "July",
    number: "01"
  },
  "08": {
    name: "August",
    number: "01"
  },
  "09": {
    name: "September",
    number: "01"
  },
  "10": {
    name: "October",
    number: "01"
  },
  "11": {
    name: "November",
    number: "01"
  },
  "12": {
    name: "December",
    number: "01"
  }
}
const getTransaction = (kisans, dateToSearch, type) => {
   console.log("TodaysTransaction", kisans);
   const formattedDate = new Date(dateToSearch);

   if (kisans && kisans.length > 0) {
      const filteredTransactions = [];
      kisans.map((kisan) => {
         if (kisan.transactions && kisan.transactions.length > 0) {
            kisan.transactions.filter((transaction) => {
               if (filterTransactionsBy(transaction, formattedDate, type)) {
                  filteredTransactions.push({
                     kisanid: kisan._id,
                     name: kisan.name,
                     fatherName: kisan.fatherName,
                     phone: kisan.phone,
                     address: kisan.address,
                     balance: kisan.balance,
                     carryForwardAmount: kisan.carryForwardAmount,
                     ...transaction,
                  });
               }
            });
         }
      });
      console.log("filtered transaction ", filteredTransactions);
      return filteredTransactions;
   }
};
const getTransactionsBetweenDates = (kisans, startDate, endDate) => {
   console.log("between Dates", kisans);
   const startDates = new Date(startDate);
   const endDates = new Date(endDate);
   console.log(startDates, endDates);

   if (kisans && kisans.length > 0) {
      const filteredTransactions = [];
      kisans.map((kisan) => {
         if (kisan.transactions && kisan.transactions.length > 0) {
            kisan.transactions.filter((transaction) => {
               if (
                  filterTransactionsBetweenDates(
                     transaction,
                     startDates,
                     endDates
                  )
               ) {
                  /* console.log(
              "new Date(transaction.date)",
              new Date(transaction.date)
            );
            console.log("startDate", startDate);
            console.log(
              "new Date(transaction.date)",
              new Date(transaction.date)
            );
            console.log("endDate", endDate); */
                  filteredTransactions.push({
                     kisanid: kisan._id,
                     name: kisan.name,
                     fatherName: kisan.fatherName,
                     phone: kisan.phone,
                     address: kisan.address,
                     balance: kisan.balance,
                     carryForwardAmount: kisan.carryForwardAmount,
                     ...transaction,
                  });
               }
            });
         }
      });
      console.log("filtered transaction ", filteredTransactions);
      return filteredTransactions;
   }
};

const filterTransactionsBy = (transaction, date, type) => {
   if (type === "byDate") {
      return (
         new Date(transaction.date).getDate() === date.getDate() &&
         new Date(transaction.date).getMonth() === date.getMonth() &&
         new Date(transaction.date).getFullYear() === date.getFullYear()
      );
   }
   if (type === "byMonth") {
      return (
         new Date(transaction.date).getMonth() === date.getMonth() &&
         new Date(transaction.date).getFullYear() === date.getFullYear()
      );
   }
};
const filterTransactionsBetweenDates = (transaction, startDate, endDate) => {
   return (
      new Date(transaction.date) >= startDate &&
      new Date(transaction.date) < endDate
   );
};

const dateConverter = (date) => {
   const D = new Date(date);
   const formattedDate = `${D.getDate()}/${
      D.getMonth() + 1
   }/${D.getFullYear()} ${D.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
   })}`;
   return formattedDate;
};

const modifyTransactionGroupByDate = (purchaser) => {
   //console.log("Purchaser" ,purchaser)
   const groups = purchaser.transactions.reduce((groups, transaction) => {
      const D = new Date(transaction.date);
      const date = `${D.getDate()}/${D.getMonth() + 1}/${D.getFullYear()}`;
      if (!groups[date]) {
         groups[date] = [];
      }
      groups[date].push(transaction);
      return groups;
   }, {});

   const groupArrays = Object.keys(groups).map((date) => {
      return {
         date,
         transactions: groups[date],
      };
   });
   console.log("groups", groupArrays);
   return groupArrays;
};

const generateDashboard = async () => {
   let totalAdvancePending = 0; //
   const totalPurchaserOutstandingPending = 0;
   let totalItemWeight = 0; //
   let totalBagsSold = 0; //

   let commissions = [];
   const cashpaidByKisan = [];
   const topKisanDefaulters = [];
   const topPurchaserDefaulters = [];
   const topSoldItems = [];
   const topBuyingPurchaser = [];

   await createDBConnection();

   const kisans = await Kisan.find();
   kisans.map((kisan) => {
      totalAdvancePending += kisan.balance;
      kisan.transactions.map((trn) => {
         if (trn.type === "CREDIT") {
            totalItemWeight += trn.totalweight;
            totalBagsSold += trn.numberofBags;
         }
      });
   });
   commissions = getDayWisecommissions(kisans);
   const advanceDataGivenAndTakenConsolidated = getAdvancePaidAndSettledByKisan(kisans);
   return {
      totalAdvancePending,
      totalItemWeight,
      totalBagsSold,
      commissions,
      advanceDataGivenAndTakenConsolidated
   };
};

//Get All Commission Data 
const getDayWisecommissions = (kisans) => {
   const transactions = [].concat.apply(
      [],
      kisans.map((kisan) => kisan.transactions)
   );
   const todaysDate = new Date()
   const getMonthsForyear = getMonthsBetweenDates(`${todaysDate.getFullYear()}-01-01`, `${todaysDate.getFullYear()}-12-31`);
  console.log("getmonthforyear",getMonthsForyear)
   const commissions = transactions.reduce((commissions, transaction) => {
     if(transaction.date > new Date(todaysDate.getFullYear(),0,1)){
       if (transaction.type === "CREDIT") {
          const D = new Date(transaction.date);
          /* const date = `${D.getDate()}/${D.getMonth() + 1}/${D.getFullYear()}`; */
          const date = `${("0" + (D.getMonth() + 1)).slice(-2)}`;
          if (!commissions[date]) {
             commissions[date] = [];
             commissionsum = 0;
          }
 
          commissions[date].push(
             (transaction.commission / 100) * transaction.grossTotal
          );
       }
     }
      return commissions;
   }, {});
   const groupArrays = Object.keys(commissions).map((date) => {
    const deleteExistingMonth = getMonthsForyear.indexOf(date)
    getMonthsForyear.splice(deleteExistingMonth,1)
    console.log("Months After Deletion",getMonthsForyear)
      return {
         date : monthToNumberMapping[date].name,
         dateNumber: date,
         commissions: commissions[date].reduce(
            (partialSum, a) => partialSum + a,
            0
         ),
      };
   });
   const emptyMonths = getMonthsForyear.map(month => {
    return {
      date : monthToNumberMapping[month].name,
      dateNumber : month,
      commissions: 0
    } 
   })
   const finalComissionsObject = [...groupArrays, ...emptyMonths].sort((a,b)=>parseFloat(a.dateNumber)-parseFloat(b.dateNumber))
   console.log("commissions",finalComissionsObject)
   return finalComissionsObject;
};
const getAdvancePaidAndSettledByKisan = (kisans) => {
   const transactions = [].concat.apply(
      [],
      kisans.map((kisan) => kisan.transactions)
   );
   let date = new Date()
   date.setMonth(date.getMonth() - 6);
   const dateSixMonthback = new Date(date.getFullYear(), date.getMonth(), 1);
   const dateSixMonthbackFormatted = `${dateSixMonthback.getFullYear()}-${dateSixMonthback.getMonth() + 1}-${dateSixMonthback.getDate()}`;
   //console.log("Date Six Month back",dateSixMonthbackFormatted);
   const todaysDate = new Date();
   const todaysDateFormatted = `${todaysDate.getFullYear()}-${todaysDate.getMonth() + 1}-${todaysDate.getDate()}`;
   const monthToPrint = getMonthsBetweenDates(dateSixMonthbackFormatted,todaysDateFormatted)
   //console.log(monthToPrint)
   const monthWiseAdvanceData = transactions.reduce((groups = [], transaction) => {
      if (
         new Date(transaction.date)> dateSixMonthback
      ) {
         const D = new Date(transaction.date);
         const date = `${("0" + (D.getMonth() + 1)).slice(-2)}`;
         /* console.log("groups[date]",groups[date])
         console.log("date",date) */
         if (!groups[date]) {
            groups[date] = {
               advanceTaken: [],
               advanceSettled: [],
            };
         }
         if (transaction.type === "CREDIT") {
            groups[date].advanceSettled.push(transaction.advanceSettlement);
            groups[date].advanceTaken.push(0);
         } else if (transaction.type === "ADVANCESETTLEMENT") {
            groups[date].advanceSettled.push(transaction.transactionAmount);
            groups[date].advanceTaken.push(0);
         } else if (transaction.type === "DEBIT") {
            groups[date].advanceSettled.push(0);
            groups[date].advanceTaken.push(Math.abs(transaction.transactionAmount));
         }
         return groups;
      }
   }, {});
   console.log("Advance Data", monthWiseAdvanceData);
   const filledMonths = Object.keys(monthWiseAdvanceData).map((month) => {
      const deleteExistingMonth = monthToPrint.indexOf(month)
      monthToPrint.splice(deleteExistingMonth,1)
      //console.log("monthToPrint",monthToPrint)
      return {
         month : monthToNumberMapping[month].name,
         monthNumber: month,
         monthWiseAdvanceData: {
            advanceSettled: monthWiseAdvanceData[month].advanceSettled.reduce(
               (partialSum, a) => partialSum + a,
               0
            ),
            advanceTaken: monthWiseAdvanceData[month].advanceTaken.reduce(
               (partialSum, a) => partialSum + a,
               0
            ),
         },
      };
   });
   const emptyMonths = monthToPrint.map(month => {
    return {
      month : monthToNumberMapping[month].name,
      monthNumber : month,
      monthWiseAdvanceData: {advanceSettled : 0,
         advanceTaken: 0,
      }
    }
   })
   const allSixMonthsData = [...emptyMonths, ...filledMonths];
   //console.log("Consolidated Advance Data", allSixMonthsData)
   return allSixMonthsData
};

const  getMonthsBetweenDates = (startDate, endDate) => {
  var start      = startDate.split('-');
  var end        = endDate.split('-');
  var startYear  = parseInt(start[0]);
  var endYear    = parseInt(end[0]);
  var dates      = [];

  
  for(var i = startYear; i <= endYear; i++) {
    console.log("displayMonth",startYear,endYear);
    var endMonth = i != endYear ? 11 : parseInt(end[1]) - 1;
    var startMon = i === startYear ? parseInt(start[1])-1 : 0;
    for(var j = startMon; j <= endMonth; j = j > 12 ? j % 12 || 11 : j+1) {
      var month = j+1;
      var displayMonth = month < 10 ? '0'+month : month;
      dates.push(displayMonth.toString());
    }
  }
  return dates;
}

module.exports = {
   getTransaction,
   getTransactionsBetweenDates,
   modifyTransactionGroupByDate,
   generateDashboard,
};
