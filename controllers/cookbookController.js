const cookbookService = require("../services/cookbook-service");
const ApiError = require("../exceptions/api-error.js");
const {Schema} = require("mongoose");

class CookbookController {
    get = async (req, res, next) => {
        try {
            const {params} = req
            console.log(params)
            const cookbook = await cookbookService.get(params.id);

            return res.json(cookbook);
        } catch (e) {
            next(e);
        }
    }
    create = async (req, res, next) => {
        try {
            const createdAt = new Date();
            const {cookbook} = req.body
            const result = await cookbookService.create({...cookbook, createdAt});

            return res.json(result);
        } catch (e) {
            next(e);
        }
    };
    recipeAdd = async (req, res, next) => {
        try {
            const {id, idRecipe} = req.params
            console.log('recipeAdd', id, idRecipe)
            const result = await cookbookService.recipeAdd(id, idRecipe);

            return res.json(result);
        } catch (e) {
            next(e);
        }
    };
    recipeDelete = async (req, res, next) => {
        try {
            const {id, idRecipe} = req.params
            console.log('recipeAdd', id, idRecipe)
            const result = await cookbookService.recipeDelete(id, idRecipe);

            return res.json(result);
        } catch (e) {
            next(e);
        }
    };

}

module.exports = new CookbookController();
