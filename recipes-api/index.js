// ---------------------------------
// Boilerplate Code to Set Up Server
// ---------------------------------

import express from "express";
import fs from "fs/promises";

console.log("RECIPES SERVER FILE IS RUNNING");

const app = express();
const port = 3001;

app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// ---------------------------------
// Helper Functions
// ---------------------------------

// Reads recipes-data.json and returns the parsed array
async function readRecipesFile() {
  const data = await fs.readFile("recipes-data.json", "utf8");
  const parsed = JSON.parse(data);
  return parsed;
}

// 1. getAllRecipes()
async function getAllRecipes() {
  const recipes = await readRecipesFile();
  return recipes;
}

// 2. getOneRecipe(index)
async function getOneRecipe(index) {
  const recipes = await readRecipesFile();
  return recipes[index];
}

// 3. getAllRecipeNames()
async function getAllRecipeNames() {
  const recipes = await readRecipesFile();

  // Try to return the "name" for each recipe.
  // If your data uses "title" instead, this still works.
  return recipes.map((recipe) => recipe.name ?? recipe.title ?? "Untitled Recipe");
}

// 4. getRecipesCount()
async function getRecipesCount() {
  const recipes = await readRecipesFile();
  return recipes.length;
}

// ---------------------------------
// API Endpoints
// ---------------------------------

// 1. GET /get-all-recipes
app.get("/get-all-recipes", async (req, res) => {
  try {
    const recipes = await getAllRecipes();
    res.json(recipes);
  } catch (error) {
    res.status(500).json({
      error: "Could not read recipes-data.json. Check the file name and location.",
      details: error.message,
    });
  }
});

// 2. GET /get-one-recipe/:index
app.get("/get-one-recipe/:index", async (req, res) => {
  try {
    const index = Number(req.params.index);

    // validate index is a number
    if (Number.isNaN(index)) {
      return res.status(400).json({ error: "Index must be a number." });
    }

    const recipe = await getOneRecipe(index);

    // validate recipe exists
    if (!recipe) {
      return res.status(404).json({ error: "No recipe found at that index." });
    }

    res.json(recipe);
  } catch (error) {
    res.status(500).json({
      error: "Could not read recipes-data.json. Check the file name and location.",
      details: error.message,
    });
  }
});

// 3. GET /get-all-recipe-names
app.get("/get-all-recipe-names", async (req, res) => {
  try {
    const names = await getAllRecipeNames();
    res.json(names);
  } catch (error) {
    res.status(500).json({
      error: "Could not read recipes-data.json. Check the file name and location.",
      details: error.message,
    });
  }
});

// 4. GET /get-recipes-count
app.get("/get-recipes-count", async (req, res) => {
  try {
    const count = await getRecipesCount();
    res.json({ count: count });
  } catch (error) {
    res.status(500).json({
      error: "Could not read recipes-data.json. Check the file name and location.",
      details: error.message,
    });
  }
});