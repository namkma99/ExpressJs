const express = require('express');
const app = express();
const router = require('./router/index');
const Database = require('./configDatabase/index');
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

Database.connect();
router(app)

app.listen(process.env.PORT, () => {
    console.log(`Example app listening at http://localhost:${process.env.PORT}`);
})