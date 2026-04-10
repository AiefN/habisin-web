const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "..", ".env") });

const app = express();
app.use(cors());
app.use(express.json());

// Setup Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

console.log("Supabase connected:", supabaseUrl ? "Yes" : "No");

const recipesRoute = require("./routes/recipes");
const budgetRoute = require("./routes/budget");
const usersRoute = require("./routes/users");

app.use("/api/recipes", recipesRoute);
app.use("/api/budget", budgetRoute);
app.use("/api/users", usersRoute);

const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;