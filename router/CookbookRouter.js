const { Router } = require("express");
const cookbookController = require("../controllers/cookbookController");

const cookbookRouter = new Router();

cookbookRouter.get("/get", cookbookController.getAll);

cookbookRouter.get("/get/:id", cookbookController.get);

cookbookRouter.post("/create", cookbookController.create);

cookbookRouter.post("/:id/recipe-add/:idRecipe", cookbookController.recipeAdd);

cookbookRouter.post("/:id/recipe-delete/:idRecipe", cookbookController.recipeDelete);

module.exports = cookbookRouter