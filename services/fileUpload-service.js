const {createReadStream, createWriteStream, rename, mkdirSync} = require("fs");
const path = require("path");
const formidable = require('formidable');
const ApiError = require("../exceptions/api-error.js");
const recipesService = require("./recipes-service");

class FileUploadService {
    async uploadImgFile(pathImg, idRecipe, files) {
        try {
            if (!files) throw ApiError.NotFound(`Файлы отсутствуют в запросе.`);
            if (!path) throw ApiError(200, `Не указан путь записи файлов (FileUploadService).`);

            const recipe = await recipesService.getById(idRecipe)
            let urlImg = null
            let steps = []
            await Object.keys(files).forEach((key) => {
                const filePath = path.join(pathImg, idRecipe, key, files[key].originalFilename)

                mkdirSync(path.join(pathImg, idRecipe, key), {recursive: true})

                let readableStream = createReadStream(files[key].filepath);
                let writeableStream = createWriteStream(filePath, {flags: "a"});
                readableStream.pipe(writeableStream);

                key === 'urlImg' ? urlImg = filePath: steps = [...steps, filePath]
            })
            steps = steps.map((val, idx) => ({
                description: recipe._doc.steps[idx].description, img: val
            }))
            const result = await recipesService.modify(idRecipe, {...recipe._doc,
                urlImg,
                steps
                })
            if(!result) throw ApiError(200, `Не удалось изменить рецепт (FileUploadService).`);
            return {
                result: "Рецепт изменен",
                ...recipe._doc,
                urlImg,
                steps
            };
        } catch (e) {
            throw ApiError.NotFound(`Ошибка записи файлов.`, e);
        }
    }

}

module.exports = new FileUploadService();