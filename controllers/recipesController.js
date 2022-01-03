const recipesService = require("../services/recipes-service");
const fileUploadService = require("../services/fileUpload-service");
const path = require('path');
const formidable = require('formidable');
const RecipeDto = require('../dtos/recipe-dto')
const ApiError = require("../exceptions/api-error.js");
const {writeFileSync} = require("fs");

class RecipesController {
    async getAll(req, res, next) {
        try {

            const recipes = await recipesService.getAll();

            return res.json(recipes);
        } catch (e) {
            next(e);
        }
    }

    async searchByTitle(req, res, next) {
        try {
            const recipe = await recipesService.searchByTitle(req.body.title);

            return res.json(recipe);
        } catch (e) {
            next(e);
        }
    }

    async create(req, res, next) {
        try {
            let recipeData = null;
            let result = null

            const form = formidable({multiples: true, keepExtensions: true});
            form.parse(req, async (err, fields, files) => {
                if (fields) recipeData = new RecipeDto(fields)
                result = await recipesService.create(recipeData);
                const resFile = await fileUploadService.uploadImgFile(path.join(__dirname, '../build/img'), result._doc._id.toString(), files)

                console.log("resFile", resFile)
            });
            console.log("recipeData", recipeData, result)

            // const resultUpload = await fileUploadService.uploadImgFile(formDataFiles, path, result);

            return res.json({result});
        } catch (e) {
            next(e);
        }
    };

    async modify(req, res, next) {
        try {
            const {recipe} = req.body
            const result = await recipesService.modify({...recipe});

            return res.json(result);
        } catch (e) {
            next(e);
        }
    };

    async delete(req, res, next) {
        try {
            const result = await recipesService.delete(req.body.id);

            return res.json(result);
        } catch (e) {
            next(e);
        }
    };

}

module.exports = new RecipesController();
