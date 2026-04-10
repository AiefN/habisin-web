const express = require("express");
const { createClient } = require("@supabase/supabase-js");
const router = express.Router();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// GET user by email
router.get("/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error) throw error;
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update user by email
router.put("/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const updates = req.body;

    const allowedFields = [
      'name', 'email', 'bio', 'location', 'avatar',
      'favorites', 'saved', 'achievements', 'cookedCount',
      'wasteSaved', 'totalSaved'
    ];

    const filteredUpdates = Object.fromEntries(
      Object.entries(updates).filter(([key]) => allowedFields.includes(key))
    );

    const { data: user, error } = await supabase
      .from('users')
      .update(filteredUpdates)
      .eq('email', email)
      .select();

    if (error) throw error;
    if (!user || user.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create new user (for register)
router.post("/", async (req, res) => {
  try {
    const { data: user, error } = await supabase
      .from('users')
      .insert([req.body])
      .select();

    if (error) throw error;
    res.json(user[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;