const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  origin: { type: String, required: true },
  flag: { type: String, required: true },
  image: { type: String, required: true },
  cookTime: { type: String, required: true },
  cookTimeMinutes: { type: Number, required: true },
  difficulty: { type: String, enum: ["Mudah", "Sedang", "Sulit"], required: true },
  pricePerServing: { type: Number, required: true },
  defaultServings: { type: Number, required: true },
  description: { type: String, required: true },
  tags: [{ type: String }],
  type: [{ type: String }],
  moods: [{ type: String }],
  ingredients: [{
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    unit: { type: String, required: true }
  }],
  steps: [{ type: String }],
  wasteItems: [{
    name: { type: String, required: true },
    tip: { type: String, required: true },
    slug: { type: String, required: true }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Recipe", recipeSchema);