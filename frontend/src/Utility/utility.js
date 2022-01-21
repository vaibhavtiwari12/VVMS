export const getAllKisan = async () => {
  const res = await fetch("/kisan/get");
  const allKisan = await res.json();
  return allKisan;
};

export const getKisanByID = async (id) => {
  const res = await fetch(`/kisan/getByID/${id}`);
  const allKisan = await res.json();
  return allKisan;
};
