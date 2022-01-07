module.exports = class RecipeDto {
    constructor(model, files) {
        if(model.title) this.title = model.title;
        if(model.description) this.description = model.description;
        if(model.private) this.private = model.private;
        if(model.urlImg)this.urlImg = files.urlImg.originalFilename
        if(model.author) this.author = this.setAuthor(model)
        if(model.cost) this.cost = model.cost;
        if(model.time) this.time = model.time;
        if(model.portionsAmount) this.portionsAmount = model.portionsAmount;
        this.ingredients = this.setIngredients(model)
        this.steps = this.setSteps(model)
        if(model.cuisine) this.cuisine = model.cuisine;
        if(model.typeOfMeal) this.typeOfMeal = model.typeOfMeal;
        if(model.kindOfFood) this.kindOfFood = model.kindOfFood;
        if(model.rating) this.rating = model.rating;
    };

    setAuthor(model) {
        return {
            id: model.author.id,
            name: model.author.name,
        }
    }

    setIngredients(model) {
        const descriptionKeys = Object.keys(model).filter(key => /ingredient.*description/i.test(key))
        const result = descriptionKeys.reduce((acc, key) => {
            console.log(key.replace(/ingredient.*(description)/i, "count"))
            const keyCount = key.replace(/description/i, "count")
            console.log(keyCount)
            acc = [...acc, {
                description: model[key],
                count: model[keyCount] ?? ""
            }]
            return acc
        }, [])
        return result
    }

    setSteps(model) {
        const stepKeys = Object.keys(model).filter(key => /step.*description/i.test(key))
        const result = stepKeys.reduce((acc, key) => {
            acc = [...acc, {
                description: model[key],
            }]
            return acc
        }, [])
        return result
    }
}