const { Router } = require('express');
const { signupSchema, signinSchema } = require('./inputValidation');
const { User, Account } = require('../db');
const jwt = require('jsonwebtoken');
const JWT_SECRET = require('../config');
const { authMiddleware } = require('./middleware');

const userRouter = Router();

userRouter.post("/signup", async (req,res) => {
    const input = req.body;
    const status = signupSchema.safeParse(input);

    if (!status.success) {
        return res.json({
            message : "Email already taken/Incorrect inputs"
        })
    }

    const existingUser = await User.findOne({
        username: req.body.username
    })
    if (existingUser) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }
    
    const newUser = await User.create({
        username : input.username,
        password : input.password,
        firstName : input.firstName,
        lastName : input.lastName,
    })
    const userId = newUser._id;

    const token = jwt.sign({ userId } , JWT_SECRET);

    await Account.create({
        userId, 
        balance: 1 + Math.ceil(Math.random()*10000)
    })
    res.json({
        message: "User created successfully",
        token: token
    })
})

userRouter.post("/signin", async (req,res) => {
    const input = req.body;
    const status = signinSchema.safeParse(input);
    if (!status.success) {
        return res.json({
            message : "Email already taken/Incorrect inputs"
        })
    }
    const existingUser = await User.findOne({
        username : input.username,
        password : input.password
    })

    if (!existingUser) {
        return res.status(411).json({
            message: "Error while logging in"
        })
    }
    
    const token = jwt.sign({ userId : existingUser._id } , JWT_SECRET);
    res.json({ authorization : `Bearer ${token}`})

})

userRouter.put('/', authMiddleware, async (req, res)=>{
    const input = req.body;
    const update = {};
    if(input.password && input.password.length > 4){
        update.password = input.password;
    }
    if(input.firstName && input.firstName.length){
        update.firstName = input.firstName;
    }
    if(input.lastName && input.lastName.length){
        update.lastName = input.lastName;
    }
    const user = await User.findOneAndUpdate({username : input.username}, update);
    if (user) {
        return res.json({message : "Details Updated successfully"});
    }
    res.json({message : "Error while updating information"});
})

userRouter.get('/bulk', authMiddleware, async (req, res)=>{
    const input = req.query.filter || "";
    
    let users = await User.find({ $or:[{firstName : {'$regex': input}}, {lastName : {'$regex': input}}]});
    if (users) {
        users = users.filter(user => user._id != req.userId).map((user) => ({
            _id : user._id,
            username : user.username, 
            firstName : user.firstName, 
            lastName : user.lastName
        }));
        return res.json({users});
    }
    else {
        return res.json({message : `Cannot find users with ${input}`});
    } 
})

module.exports = userRouter;