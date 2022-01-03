const RecipeModel = require("../models/recipeModel");
const ApiError = require("../exceptions/api-error.js");

class RecipesService {
    async getAll() {
        try {
            const recipes = await RecipeModel.find().exec()
            if (!recipes) throw ApiError.NotFound(`Данные не найдены.`);
            return [...recipes];
        } catch (e) {
            throw ApiError.NotFound(`Ошибка запроса данных.`, e);
        }
    }

    async searchByTitle(title) {
        try {
            const recipe = await RecipeModel.find({title: title}).exec()
            return [...recipe]
        } catch (e) {
            throw ApiError.NotFound(`Ошибка поиска записи в БД.`, e);
        }
    }

    async create(recipe) {
        try {
            console.log("service", recipe)
            const result = await RecipeModel.create(recipe);
            console.log('Успешно')
            return {
                result: "Рецепт создан",
                ...result,
            };
        } catch (e) {
            throw ApiError.NotFound(`Ошибка создания записи в БД.`, e);
        }
    }

    async modify({id, ...other}) {
        try {
            let result = await RecipeModel.findById(id);

            if (!result) throw new Error()
            const docs = await RecipeModel.updateOne({_id: id}, {
                ...other
            })
            return {
                result: "Рецепт изменен",
                ...docs,
            };

        } catch (e) {
            throw ApiError.NotFound(`Ошибка создания запис в БД.`, e);
        }
    }

    async delete(id) {
        try {
            const result = await RecipeModel.findByIdAndDelete(id)

            console.log("Рецепт удален : ", result);
            return {
                result: "Рецепт удален",
                ...result,
            };
        } catch (e) {
            throw ApiError.NotFound(`Ошибка создания запис в БД.`, e);
        }
    }
}

module.exports = new RecipesService();