const { Schema, model } = require("mongoose");

const RecipeSchema = new Schema({
    title: { type: String, require: true },
    description: { type: String, require: true },
    ingredients: {type: Array, require: true},
    photos: {type: Array, require: false},
    cuisine: { type: String, require: true },
    author: { type: Object, require: true },
    cost: { type: Number, require: true },
    typeOfMeal: { type: String, require: true },
    createdAt: { type: Date, default: Date.now  }
});

module.exports = model("Recipe", RecipeSchema);
