export const getAllKisan = async () => {
  const res = await fetch("/kisan/get");
  const allKisan = await res.json();
  return allKisan;
};

export const getKisanByID = async (id) => {
  const res = await fetch(`/kisan/getByID/${id}`);
  const allKisan = await res.json();
  console.log("Result of getkisanById");
  return allKisan;
};

export const dateConverter = (date) => {
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

export const convertOnlyDate = (date) => {
  const D = new Date(date);
  const formattedDate = `${D.getFullYear()}-${("0" + (D.getMonth() + 1)).slice(
    -2
  )}-${D.getDate()}`;
  return formattedDate;
};
export const getOnlyMonth = (date) => {
  const D = new Date(date);
  const formattedDate = `${D.getFullYear()}-${("0" + (D.getMonth() + 1)).slice(
    -2
  )}`;
  return formattedDate;
};

export const getTransactionsBydate = async (date) => {
  const res = await fetch(`kisan/getTodaysTransaction/${date}`);
  const allTransactions = await res.json();
  console.log("ALL TRANSACTION", allTransactions);
  return allTransactions;
};
export const getTransactionsByMonth = async (month) => {
  const res = await fetch(`kisan/getTransactionByMonth/${month}`);
  const allTransactions = await res.json();
  console.log("ALL TRANSACTION -- Month", allTransactions);
  return allTransactions;
};
export const getTransactionsBetweenDates = async (startDate, endDate) => {
  const res = await fetch(
    `kisan/getTransactionsBetweenDates/${startDate}/${endDate}`
  );
  const allTransactions = await res.json();
  console.log("ALL TRANSACTION -- Month", allTransactions);
  return allTransactions;
};
