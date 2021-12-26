const { Schema, model } = require("mongoose");

const RecipeSchema = new Schema({
    title: { type: String, require: true },
    description: { type: String, require: true, default: "" },
    private: {type: Boolean, require: true, default: true},
    urlImg: {type: String, require: false, default: ""},
    author: { type: Object, require: true },
    cost: { type: Number, require: true },
    time: { type: Number, require: true },
    portionsAmount: { type: Number, require: true },
    ingredients: {type: Array, require: true},
    steps: { type: Array, require: true },
    cuisine: { type: String, require: true },
    typeOfMeal: { type: String, require: true },
    kindOfFood: { type: String, require: true },
    createdAt: { type: Date, default: Date.now  },
    rating: { type: Number, require: true, default: 1 },
});

module.exports = model("Recipe", RecipeSchema);
