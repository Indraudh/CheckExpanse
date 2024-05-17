const express=require('express');
const Transaction=require('../models/Transaction');
const moment=require('moment');
const router=express.Router();

router.post('/add-transaction',async function(req,res){

    try {
        const newtr = new Transaction(req.body);
        await newtr.save();
        res.send("Transaction saved successfully");
    } catch (error) {
        res.status(500).json(error); 
    }

});

router.post('/edit-transaction',async function(req,res){

  try {
      await Transaction.findOneAndUpdate({_id : req.body._id}, req.body)
      res.send("Transaction Updated successfully");
  } catch (error) {
      res.status(500).json(error); 
  }

});

router.post('/delete-transaction',async function(req,res){

  try {
    await Transaction.findOneAndDelete({_id : req.body.transactionId});
    res.send("Transaction deleted Successfully");
  } catch (error) {
      res.status(500).json(error); 
  }

});

router.post('/get-all-transactions',async function(req,res){
    const { frequency, range , Type } = req.body;
    try {
      const tr = await Transaction.find({
        ...(frequency !== "custom"
          ? {
              date: {
                $gt: moment().subtract(Number(req.body.frequency), "d").toDate(),
              },
            }
          : {
              date: {
                $gte: range[0],
                $lte: range[1],
              },
            }),
        ...( Type !== 'all' && {type : Type}),
        userid: req.body.userid,
      }).sort({date : 1});
      res.send(tr);
    } catch (error) {
        res.status(500).json(error); 
    }

});

module.exports=router;