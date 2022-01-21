const express = require("express");
const { controller } = require("../Mongo/kisanController");
const Kisan = require("../Schema/kisanSchema");

const KisanRouter = express.Router();

KisanRouter.get("/get", async (req, res) => {
  const allKisan = await controller("Get");
  res.json(allKisan);
});

KisanRouter.get("/getByID/:id", async (req, res) => {
  console.log("Request Params", req.params.id);
  const allKisan = await controller("FindByID", req.params.id);
  res.json(allKisan);
});

KisanRouter.post("/add", async (req, res) => {
  console.log("IS here", req.body);
  const newkisan = new Kisan({
    name: req.body.name,
    fatherName: req.body.fatherName,
    phone: req.body.phone,
    address: req.body.address,
    date: new Date().toString(),
    balance: 0,
    transactions: [],
  });
  const addedKisan = await controller("Add", newkisan);
  res.json(addedKisan);
});

KisanRouter.post("/AddTransaction/:id", async (req, res) => {
  console.log(
    "TRANSACTION ",
    req.params.id,
    req.body.transaction,
    req.body.balance
  );
  const addedTransaction = await controller("AddTransaction", {
    id: req.params.id,
    transaction: { ...req.body.transaction, date: new Date() },
  });
  res.json(addedTransaction);
});

/*KisanRouter.get("/delete/:id",async (req,res) => {
    console.log("Reaching Router");
    const deletedPost = await controller('Delete', {id: req.params.id});
    res.json(deletedPost);
});
 */
module.exports = KisanRouter;
