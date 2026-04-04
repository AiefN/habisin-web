const express = require("express");
const Recipe = require("../models/Recipe");
const router = express.Router();

// GET all recipes
router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET recipe by ID
router.get("/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }
    res.json(recipe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create new recipe
router.post("/", async (req, res) => {
  try {
    const recipe = new Recipe(req.body);
    await recipe.save();
    res.json(recipe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update recipe
router.put("/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }
    res.json(recipe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE recipe
router.delete("/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndDelete(req.params.id);
    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }
    res.json({ message: "Recipe deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;