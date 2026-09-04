// src/shared.types.ts
// TODO add recipies array to user and recipies shared type
export type User = {
  _id: string;
  name: string;
  email: string;
};

export type Recipe = {
  _id: string,
  title: string,
  description: string,
  image: string, //TODO check this
  ingredients: Ingredient[], //TODO check this
  instructions: Instruction[],
  tags: string[],
  ownerId: User,
  createdAt?: string,     // ISO date string over JSON
  updatedAt?: string
};

export type Ingredient = {
  name: string,
  quantity: string
};

export type Instruction = {
  step: number,
  description: string
}

// const mongoose = require("mongoose");

// const ingredientSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   quantity: { type: String, required: true },
// });

// const instructionSchema = new mongoose.Schema({
//   step: { type: Number, required: true },
//   description: { type: String, required: true },
// });

// const recipeSchema = new mongoose.Schema(
//   {
//     title: { type: String, required: true },
//     description: { type: String },
//     image: { type: String },
//     ingredients: [ingredientSchema],
//     instructions: [instructionSchema],
//     tags: [String],
//     ownerId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//   },
//   {
//     timestamps: true,
//   },
// );

// module.exports = mongoose.model("Recipe", recipeSchema);

//TODO what happens if two different users
//make recipie with the same name???
// check if title AND user id is the same? (rather than generating
// recipe id???)

// {
//   "title": "Steak baby!",
//   "description": "Crunchy romaine with creamy cashew Caesar dressing.",
//   "image": "https://example.com/images/vegan-caesar.jpg",
//   "ingredients": [
//     { "name": "Romaine lettuce", "quantity": "1 head" },
//     { "name": "Cashews", "quantity": "1/2 cup" },
//     { "name": "Lemon juice", "quantity": "2 tbsp" },
//     { "name": "Dijon mustard", "quantity": "1 tsp" },
//     { "name": "Garlic clove", "quantity": "1" }
//   ],
//   "instructions": [
//     { "step": 1, "description": "Blend the cashews, lemon juice, mustard, and garlic until smooth." },
//     { "step": 2, "description": "Chop romaine lettuce and place in a bowl." },
//     { "step": 3, "description": "Toss with the blended dressing and serve chilled." }
//   ],
//   "tags": ["vegan", "salad", "healthy"]
// }

