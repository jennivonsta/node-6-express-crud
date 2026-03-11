// ---------------------------------
// Boilerplate Code to Set Up Server
// ---------------------------------

// Import the Express library so we can create a web server
import express from "express";

// Import the File System module from Node so we can read files
// "fs/promises" lets us use async/await when reading files
import fs from "fs/promises";

// This console message lets us know the server file has started running
console.log("RECIPES SERVER FILE IS RUNNING");

// Create an Express application instance
// This gives us access to Express features like routing (app.get)
const app = express();

// Define the port number the server will run on
// The browser will connect to localhost:3001
const port = 3001;

// Tell Express that our server will send and receive JSON data
app.use(express.json());

// Start the server and listen for requests on the specified port
app.listen(port, () => {

  // When the server starts successfully, print this message
  console.log(`Server is running on port ${port}`);
});


// ---------------------------------
// Helper Functions
// ---------------------------------

// Reads recipes-data.json and returns the parsed array
async function readRecipesFile() {

  // Read the recipes-data.json file as text
  const data = await fs.readFile("recipes-data.json", "utf8");

  // Convert the JSON text into a JavaScript object/array
  const parsed = JSON.parse(data);

  // Return the parsed recipes data
  return parsed;
}


// 1. getAllRecipes()
async function getAllRecipes() {

  // Call our helper function to read the recipes file
  const recipes = await readRecipesFile();

  // Return the entire recipes array
  return recipes;
}


// 2. getOneRecipe(index)
async function getOneRecipe(index) {

  // Read the recipes file
  const recipes = await readRecipesFile();

  // Return the recipe at the specific index position
  return recipes[index];
}


// 3. getAllRecipeNames()
async function getAllRecipeNames() {

  // Read the recipes file
  const recipes = await readRecipesFile();

  // Try to return the "name" for each recipe.
  // If your data uses "title" instead, this still works.

  // .map() loops through every recipe in the array
  // It returns a new array containing just the recipe names
  return recipes.map((recipe) => recipe.name ?? recipe.title ?? "Untitled Recipe");
}


// 4. getRecipesCount()
async function getRecipesCount() {

  // Read the recipes file
  const recipes = await readRecipesFile();

  // Return the total number of recipes in the array
  return recipes.length;
}


// ---------------------------------
// API Endpoints
// ---------------------------------

// 1. GET /get-all-recipes

// Create an API route that listens for GET requests at /get-all-recipes
app.get("/get-all-recipes", async (req, res) => {

  // Use try/catch in case something goes wrong
  try {

    // Call our helper function to get all recipes
    const recipes = await getAllRecipes();

    // Send the recipes back to the browser as JSON
    res.json(recipes);

  } catch (error) {

    // If something goes wrong, send a 500 error response
    res.status(500).json({
      error: "Could not read recipes-data.json. Check the file name and location.",
      details: error.message,
    });
  }
});


// 2. GET /get-one-recipe/:index

// Create an API route with a dynamic parameter called "index"
app.get("/get-one-recipe/:index", async (req, res) => {

  try {

    // Get the index value from the URL and convert it to a number
    const index = Number(req.params.index);

    // validate index is a number
    if (Number.isNaN(index)) {

      // If the index is not a number, return a 400 error
      return res.status(400).json({ error: "Index must be a number." });
    }

    // Get the recipe at the specified index
    const recipe = await getOneRecipe(index);

    // validate recipe exists
    if (!recipe) {

      // If there is no recipe at that index, return a 404 error
      return res.status(404).json({ error: "No recipe found at that index." });
    }

    // Send the recipe back as JSON
    res.json(recipe);

  } catch (error) {

    // If something goes wrong reading the file, send an error
    res.status(500).json({
      error: "Could not read recipes-data.json. Check the file name and location.",
      details: error.message,
    });
  }
});


// 3. GET /get-all-recipe-names

// This endpoint returns only the names of all recipes
app.get("/get-all-recipe-names", async (req, res) => {

  try {

    // Get the array of recipe names
    const names = await getAllRecipeNames();

    // Send the names back as JSON
    res.json(names);

  } catch (error) {

    // Handle file reading errors
    res.status(500).json({
      error: "Could not read recipes-data.json. Check the file name and location.",
      details: error.message,
    });
  }
});


// 4. GET /get-recipes-count

// This endpoint returns how many recipes exist
app.get("/get-recipes-count", async (req, res) => {

  try {

    // Get the total number of recipes
    const count = await getRecipesCount();

    // Send the count back as JSON
    res.json({ count: count });

  } catch (error) {

    // Handle errors if the file cannot be read
    res.status(500).json({
      error: "Could not read recipes-data.json. Check the file name and location.",
      details: error.message,
    });
  }
});