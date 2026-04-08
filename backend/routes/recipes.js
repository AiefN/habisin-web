const express = require("express");
const { createClient } = require("@supabase/supabase-js");
const router = express.Router();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// GET all recipes
router.get("/", async (req, res) => {
  try {
    const { data: recipes, error } = await supabase.from('recipes').select('*');
    if (error) throw error;
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET recipe by ID
router.get("/:id", async (req, res) => {
  try {
    const { data: recipe, error } = await supabase.from('recipes').select('*').eq('id', req.params.id).single();
    if (error) throw error;
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
    const { data: recipe, error } = await supabase.from('recipes').insert([req.body]).select();
    if (error) throw error;
    res.json(recipe[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update recipe
router.put("/:id", async (req, res) => {
  try {
    const { data: recipe, error } = await supabase.from('recipes').update(req.body).eq('id', req.params.id).select();
    if (error) throw error;
    if (!recipe || recipe.length === 0) {
      return res.status(404).json({ error: "Recipe not found" });
    }
    res.json(recipe[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE recipe
router.delete("/:id", async (req, res) => {
  try {
    const { error } = await supabase.from('recipes').delete().eq('id', req.params.id);
    if (error) throw error;
    res.json({ message: "Recipe deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;