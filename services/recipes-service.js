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
            //     , function (err, docs) {
            //     if (err) {
            //         console.log(err)
            //         throw ApiError.NotFound(`Ошибка обновления записи в БД.`, err);
            //     } else {
            //         console.log("Result : ", docs);
            //         return [...docs]
            //     }
            // });
            return [...recipe]
        } catch (e) {
            throw ApiError.NotFound(`Ошибка поиска записи в БД.`, e);
        }
    }

    async create(recipe) {
        try {
            console.log(recipe)
            const result = await RecipeModel.create({...recipe});
            console.log('Успешно')
            return {
                ...result,
            };
        } catch (e) {
            throw ApiError.NotFound(`Ошибка создания записи в БД.`, e);
        }
    }

    async modify({id, ...other}) {
        try {
            let result = await RecipeModel.findById(id).exec();
            // ,function (err, docs) {
            //     if (err){
            //         console.log(err);
            //     }
            //     else{
            //         docs.photos.length? recipePhotos = [...photos, docs.photos] : [...photos]
            //     }
            // })
            console.log(result)
            if(!result) throw new Error()
            const docs = await RecipeModel.updateOne({_id: id}, {
                ...other
            }).exec()
            //     , function (err, docs) {
            //     if (err) {
            //         console.log(err)
            //         throw ApiError.NotFound(`Ошибка обновления записи в БД.`, err);
            //     } else {
                    console.log("Рецепт обновлен : ", docs);
            //         return true
            //     }
            // });
        } catch (e) {
            throw ApiError.NotFound(`Ошибка создания запис в БД.`, e);
        }
    }

    async delete(id) {
        try {
            const docs = await RecipeModel.findByIdAndDelete(id).exec()
            //     , function (err, docs) {
            //     if (err) {
            //         console.log(err)
            //         throw ApiError.NotFound(`Ошибка удаления записи в БД.`, err);
            //     } else {
                    console.log("Рецепт удален : ", docs);
            //         return true
            //     }
            // });
        } catch (e) {
            throw ApiError.NotFound(`Ошибка создания запис в БД.`, e);
        }
    }
}

module.exports = new RecipesService();