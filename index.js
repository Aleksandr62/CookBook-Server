require("dotenv").config();
const express = require("express");
// const cors = require("cors");
const path = require('path')
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const apiRouter = require("./router/ApiRouter");
const recipesRouter = require("./router/RecipesRouter");
const cookbookRouter = require("./router/CookbookRouter");
const errorMiddleware = require("./middlewares/error-middleware");
const {log} = require("nodemon/lib/utils");

console.log(__dirname)
console.log(process.env.PORT, process.env.DATABASE_URL)

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cookieParser());
// app.use(cors);

app.use('/', express.static(path.join(__dirname, 'build')))
app.use('/api', apiRouter);
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
