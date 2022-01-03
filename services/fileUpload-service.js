const {readFileSync, rename} = require("fs");
const path = require("path");
const formidable = require('formidable');
const ApiError = require("../exceptions/api-error.js");
const recipesService = require("./recipes-service");

class FileUploadService {
    async uploadImgFile(pathImg, idRecipe, files) {
        try {
            if (!files) throw ApiError.NotFound(`Файлы отсутствуют в запросе.`);
            if (!path) throw ApiError(200, `Не указан путь записи файлов (FileUploadService).`);

            Object.keys(files).forEach((key) => {
                console.log('file', files[key])
                console.log(path.join(pathImg, idRecipe, key, files[key].originalFilename))
                const filePath = path.join(pathImg, idRecipe, key, files[key].originalFilename)
                const res = rename(path.join(__dirname, files[key].filepath), filePath, function (err, result) {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log(res)
                    }
                });
                const resWrite = key === 'urlImg' ? recipesService.modify(idRecipe, {
                        [key]: filePath
                    })
                    :
                    recipesService.modify(idRecipe, {
                        steps: [...steps, {img: filePath}]
                    })
                console.log("uploadImgFile - writeFileSync", res, resWrite)
            })
            // return [...recipes];
        } catch (e) {
            throw ApiError.NotFound(`Ошибка записи файлов.`, e);
        }
    }

}

module.exports = new FileUploadService();