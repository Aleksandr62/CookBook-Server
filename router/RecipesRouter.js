const { Router } = require("express");
const recipesController = require("../controllers/recipesController");

const recipesRouter = new Router();

recipesRouter.get("/get", recipesController.getAll);

recipesRouter.post("/search/title", recipesController.searchByTitle);

recipesRouter.post("/create", recipesController.create);

recipesRouter.post("/modify", recipesController.modify);

recipesRouter.post("/delete", recipesController.delete);

module.exports = recipesRouter