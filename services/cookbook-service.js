const CookbookModel = require("../models/cookbookModel");
const ApiError = require("../exceptions/api-error.js");

class CookbookService {
    async get(id) {
        try {
            console.log(id)
            const cookbook = await CookbookModel.findById(id)
            console.log(cookbook)
            if (cookbook === null) throw ApiError.NotFound(`Данные не найдены.`);
            return cookbook;
        } catch (e) {
            throw ApiError.NotFound(`Ошибка запроса книги.`, e);
        }
    }

    async create(recipe) {
        try {
            const cookbook = await CookbookModel.create(recipe);
            console.log('Успешно')
            return {
                ...cookbook,
            };
        } catch (e) {
            throw ApiError.NotFound(`Ошибка создания книги в БД.`, e);
        }
    }

    async recipeAdd(id, idRecipe) {
        try {
            let result = null;
            let cookbook = await CookbookModel.findById(id).exec();
            console.log(cookbook)
            if (cookbook.recipesId.includes(idRecipe))
                throw ApiError(200, `Рецепт уже добавлен в книгу.`);
            else
                result = await CookbookModel.findByIdAndUpdate( id, {
                    recipesId: [...cookbook.recipesId, idRecipe],
                    updatedAt: new Date()
                }).exec()
            console.log("Рецепт добавлен : ", result);
            return result
        } catch (e) {
            throw ApiError.NotFound(`Ошибка добавления рецепта в книгу.`, e);
        }
    }

    async recipeDelete(id, idRecipe) {
        try {
            let result = null;
            let cookbook = await CookbookModel.findById(id).exec();
            console.log(cookbook)
            if (!cookbook.recipesId.includes(idRecipe))
                throw ApiError(200, `Рецепт отсутствует в книге.`);
            else
                result = await CookbookModel.findByIdAndUpdate( id, {
                    recipesId: cookbook.recipesId.filter(item => item !== idRecipe),
                    updatedAt: new Date()
                }).exec()
            console.log("Рецепт удален : ", result);
            return result
        } catch (e) {
            throw ApiError.NotFound(`Ошибка удаления рецепта из книги.`, e);
        }
    }
}

module.exports = new CookbookService();