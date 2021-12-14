const { Schema, model } = require("mongoose");

const CookbookSchema = new Schema({
    title: { type: String, require: true },
    description: { type: String, require: true },
    recipesId: {type: Array, require: true},
    photo: {type: String, require: false},
    cuisine: { type: String, require: true },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    updatedAt: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now  }
});

module.exports = model("Cookbook", CookbookSchema);
