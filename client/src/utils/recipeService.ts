// src/utils/recipeService.ts
import tokenService from "./tokenService";
//import userService from "./userService";
import type { Recipe, Instruction, Ingredient } from "../shared.types";
import axios from "axios";

const BASE_URL = "/api/recipes/";

type RecipeData = {
  title: string;
  description: string;
  image: string;
  ingredients: Ingredient[];
  instructions: Instruction[];
  tags: string[];
};

// GET /api/recipes/  -> all recipes, for the "browse all" page
async function getAllRecipes(): Promise<Recipe[] | null> {
  try {
    const res = await axios.get(BASE_URL);
    return res.data;
  } catch (err) {
    return null;
  }
}

// GET /api/recipes/:id -> one recipe, for RecipeDetail
async function getRecipe(id: string): Promise<Recipe | null> {
  try {
    const res = await axios.get(BASE_URL + id);
    return res.data;
  } catch (err) {
    return null;
  }
}

// GET /api/recipes/creator/:user_id -> just this creator's recipes
async function getRecipesByUser(user_id: string): Promise<Recipe[] | null> {
  try {
    const res = await axios.get(BASE_URL); // GET /api/recipes/
    console.log("RAW recipes from API:", res.data);
    console.log("Looking for ownerId ===", user_id, typeof user_id);
    const allRecipes: Recipe[] = res.data;
    return allRecipes.filter((r) => r.ownerId._id === user_id);
  } catch (err) {
    return null;
  }
}

async function setRecipe(recipe: RecipeData): Promise<Recipe> {
  try {
    const token = tokenService.getToken();
    const res = await axios.post(BASE_URL, recipe, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    throw new Error("couldn't set recipe");
  }
}

export default {
  setRecipe,
  getRecipe,
  getAllRecipes,
  getRecipesByUser,
};