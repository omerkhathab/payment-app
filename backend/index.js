// import {User} from './db.js'

const express = require("express");
const cors = require("cors");
const mainRouter = require("./routes");

const app = express();

app.use(express.json());
app.use(cors())
app.use('/api/v1', mainRouter)

app.listen(3000);
