# 📘 API Documentation

Base URL: `http://localhost:3000`

## Overview

| Resource  | Method | Endpoint               | Description                              |
|------------|--------|------------------------|------------------------------------------|
| `recipes`  | GET    | /get-all-recipes       | Retrieves all recipes.                   |
| `recipes`  | GET    | /get-one-recipe/:index | Retrieves a single recipe by index.      |
| `recipes`  | GET    | /get-all-recipe-names  | Retrieves the names of all recipes.      |
| `recipes`  | GET    | /get-recipes-count     | Retrieves the total count of recipes.    |

---

## Recipes

### 🔹 GET `/get-all-recipes`

**Description:** Retrieves all recipes from the `recipes-data.json` file.

**Example Request URL:**  
`GET http://localhost:3000/get-all-recipes`

**Example Response:**

```json
[
  {
    "name": "Spaghetti with Red Sauce",
    "cookingMethod": "stove-top boil",
    "ingredients": [
      "spaghetti",
      "tomato sauce",
      "tomato paste",
      "ground beef",
      "salt",
      "pepper",
      "garlic",
      "onion",
      "parmesan cheese"
    ]
  },
  {
    "name": "Fried Chicken",
    "cookingMethod": "deep fry",
    "ingredients": ["chicken", "flour", "salt", "pepper", "garlic", "oil"]
  },
  {
    "name": "Crispy Tofu",
    "cookingMethod": "stir fry",
    "ingredients": ["tofu", "salt", "pepper", "garlic", "oil", "scallions"]
  }
]
```

---

### 🔹 GET `/get-one-recipe/:index`

**Description:** Retrieves a single recipe by its index number. The index corresponds to the recipe’s position in the `recipes-data.json` array (starting at 0).

**Example Request URL:**  
`GET http://localhost:3000/get-one-recipe/2`

**Example Response:**

```json
{
  "name": "Crispy Tofu",
  "cookingMethod": "stir fry",
  "ingredients": ["tofu", "salt", "pepper", "garlic", "oil", "scallions"]
}
```

---

### 🔹 GET `/get-all-recipe-names`

**Description:** Retrieves an array containing the names of all recipes.

**Example Request URL:**  
`GET http://localhost:3000/get-all-recipe-names`

**Example Response:**

```json
[
  "Spaghetti with Red Sauce",
  "Fried Chicken",
  "Crispy Tofu",
  "Grilled Cheese Sandwich",
  "Baked Salmon",
  "Vegetable Soup"
]
```

---

### 🔹 GET `/get-recipes-count`

**Description:** Retrieves the total number of recipes in the `recipes-data.json` file.

**Example Request URL:**  
`GET http://localhost:3000/get-recipes-count`

**Example Response:**

```
6
```
