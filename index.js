require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require('path')
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const apiRouter = require("./router/ApiRouter");
const recipesRouter = require("./router/RecipesRouter");
const cookbookRouter = require("./router/CookbookRouter");
const errorMiddleware = require("./middlewares/error-middleware");
const {log} = require("nodemon/lib/utils");

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cookieParser());

console.log("CLIENT_URL", process.env.CLIENT_URL)
console.log("API_URL", process.env.API_URL)

app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
    // methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
}));

app.use('/', express.static(path.join(__dirname, 'build')))
app.use('/api',  apiRouter);
app.use('/recipes', recipesRouter);
app.use('/cookbook', cookbookRouter);
app.use('/*', express.static(path.join(__dirname, 'build')))
app.use(errorMiddleware);

const startServer = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        }, (err) => console.log(err));
        app.listen(PORT, () => console.log(`Server started at port = ${PORT}`));
    } catch (e) {
        console.log(e);
    }
};

startServer();
