const { Router } = require('express');
const { Account, User } = require('../db');
const { default: mongoose } = require('mongoose');
const { authMiddleware } = require('./middleware');

const accountRouter = Router();

accountRouter.get('/balance', authMiddleware, async (req, res)=>{
    
    const userId = req.userId;
    const user = await Account.findOne({ userId : userId});
    const username = await User.findOne({ _id : userId});
    
    if (user) {
        const balance = user.balance;
        return res.json({balance, username});
    }
    else {
        return res.json({message : "User not found"})
    }
})

accountRouter.post('/transfer', authMiddleware, async (req, res)=>{
    
    const session = await mongoose.startSession();
    session.startTransaction();
    
    const userId = req.userId;
    const {amount, to} = req.body;

    const fromAccount = await Account.findOne({ userId : userId });

    if(fromAccount.balance < amount) {
        return res.json({message : "Insufficient Funds"});
    }

    const toAccount = await Account.findOne({userId : to});
    
    if (!toAccount) {
        await session.abortTransaction();
        return res.json({message : "Account not found"});
    }

    await Account.updateOne({ userId : userId }, {
        $inc : {
            balance : -amount
        }
    }).session(session);

    await Account.updateOne({ userId : to }, {
        $inc : {
            balance : amount
        }
    }).session(session);
    await session.commitTransaction();
    return res.json({
        message: "Transfer successful"
    })
    
})

module.exports = {
    accountRouter
}