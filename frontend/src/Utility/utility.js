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
