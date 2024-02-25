const zod = require('zod');

const signupSchema = zod.object({
    username : zod.string().email(),
    password : zod.string().min(5),
    firstName : zod.string().min(1),
    lastName : zod.string().min(1),
});
const signinSchema = zod.object({
    username : zod.string().email(),
    password : zod.string().min(5),
});

module.exports = { signupSchema, signinSchema };

