const {readFileSync } = require("fs");
const path = require("path");
const formidable =require('formidable');
const ApiError = require("../exceptions/api-error.js");

class FileUploadService {
    async uploadImgFile(formDataFiles, path, element) {
        try {
            if (!files) throw ApiError.NotFound(`Файлы отсутствуют в запросе.`);
            if(!path) throw ApiError(200,`Excepted path (FileUploadService).`);

            const fullPath = path.join(__dirname, 'build/img', path, element.id )
            const form = formidable({ multiples: true, uploadDir: fullPath });

            form.parse(req, (err, fields, files) => {
                console.log('err:', fields);
                console.log('fields:', fields);
                console.log('files:', files);
            });

            return [...recipes];
        } catch (e) {
            throw ApiError.NotFound(`Ошибка запроса данных.`, e);
        }
    }

}

module.exports = new FileUploadService();