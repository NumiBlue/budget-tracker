const router = require("express").Router();
 const Transaction = require("../models/transaction.js");

 router.post("/api/transaction", ({ body }, res) => {
   Transaction.create(body)
     .then((dbTransaction) => {
       res.json(dbTransaction);
     })
     .catch((err) => {
       res.status(404).json(err);
     });
 });

 router.post("/api/transaction/bulk", ({ body }, res) => {
   Transaction.insertMany(body)
     .then((dbTransaction) => {
       res.json(dbTransaction);
     })
     .catch((err) => {
       res.status(404).json(err);
     });
 });

 router.get("/api/transaction", (req, res) => {
   Transaction.find({})
     .sort({ date: -1 })
     .then((dbTransaction) => {
       res.json(dbTransaction);
     })
     .catch((err) => {
       res.status(404).json(err);
     });
 });

 router.delete("/api/transaction/deleteAll", (req, res) => {
   Transaction.deleteMany({})
     .then((deletedTransactions) => {
       res.json(deletedTransactions);
     })
     .catch((err) => {
       res.status(500).json(err);
     });
 });

 module.exports = router;