const express = require('express');
const authProtect = require('../middleware/authProtect');
const Account = require('../models/Account-model');
const { default: mongoose } = require('mongoose');

const router = express.Router();

router.get('/balance',authProtect,async(req, res) => {
   try {
    const account = await Account.findOne({_id :req.user.account})
    res.json({balance: account});
   } catch (error) {
    res.status(401).json(error.message)
   }
});

router.post("/transfer",authProtect,async(req, res) => {
try {
    const session = await mongoose.startSession();
    session.startTransaction()   
        const{amount,to} = req.body;
        //sender account
        const senderaccount = await Account.findOne({userId :req.user._id}).session(session)
    
        if(!senderaccount || senderaccount.balance < amount){
            await session.abortTransaction()
            return res.status(400).json({msg: "Insufficient balance"})
        }
        //receiver account
        const receiverAccount = await Account.findOne({userId:to}).session(session)
        if(!receiverAccount){
            await session.abortTransaction()
            return res.status(404).json({msg: "Invalid receiver account"})
        }
        //perform transfer
    
        await Account.updateOne({userId:  req.user._id},{$inc:{balance:-amount}}).session(session)
        await Account.updateOne({userId: to},{$inc:{balance:amount}}).session(session)
        // commit the transaction
    
        await session.commitTransaction()
        res.json({msg: "Transfer successful"})
     
} catch (error) {
    res.status(500).json({msg:"internal error"})
}
})


module.exports =router