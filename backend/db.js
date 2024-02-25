const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/payment-app");

const userSchema = {
    username : String,
    password : String,
    firstName : String,
    lastName : String,
};

const accountSchema = {
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        require : true
    },
    balance : {
        type : Number,
        required : true
    }
};

const User = mongoose.model('User', userSchema);
const Account = mongoose.model('Account', accountSchema);

module.exports = {
	User, Account
};

