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
            filterTransactionsBetweenDates(transaction, startDates, endDates)
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
    console.log("transaction.date",transaction.date)
    const D = new Date(transaction.date);
    const date =  `${D.getDate()}/${
      D.getMonth() + 1
    }/${D.getFullYear()}`;
    //const date = transaction.date.split(' ')[0];
    console.log("date",date)
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(transaction);
    return groups;
  }, {});

  const groupArrays = Object.keys(groups).map((date) => {
    return {
      date,
      transactions: groups[date]
    };
  });
  console.log("groups",groupArrays);
  return groupArrays;
}
module.exports = { getTransaction, getTransactionsBetweenDates, modifyTransactionGroupByDate };
