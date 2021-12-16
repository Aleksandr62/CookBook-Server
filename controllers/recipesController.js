const recipesService = require("../services/recipes-service");
const ApiError = require("../exceptions/api-error.js");

class RecipesController {
    getAll = async (req, res, next) => {
        try {

            const recipes = await recipesService.getAll();

            return res.json(recipes);
        } catch (e) {
            next(e);
        }
    }
    searchByTitle = async (req, res, next) => {
        try {
            const recipe = await recipesService.searchByTitle(req.body.title);

            return res.json(recipe);
        } catch (e) {
            next(e);
        }
    }
    create = async (req, res, next) => {
        try {
            const createdAt = new Date();
            const {recipe} = req.body
            const result = await recipesService.create({...recipe, createdAt});

            return res.json(result);
        } catch (e) {
            next(e);
        }
    };
    modify = async (req, res, next) => {
        try {
            const {recipe} = req.body
            const result = await recipesService.modify({...recipe});

            return res.json(result);
        } catch (e) {
            next(e);
        }
    };
    delete = async (req, res, next) => {
        try {
            const result = await recipesService.delete(req.body.id);

            return res.json(result);
        } catch (e) {
            next(e);
        }
    };

}

module.exports = new RecipesController();
