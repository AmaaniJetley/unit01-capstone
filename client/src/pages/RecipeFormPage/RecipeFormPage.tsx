import type { Recipe, Ingredient, Instruction, User } from "../../shared.types";
import { useState } from "react";
import recipeService from "../../utils/recipeService";
import { useNavigate } from "react-router-dom";

const initIngredients: Ingredient[] = [
  { name: "", quantity: "" },
  { name: "", quantity: "" },
  { name: "", quantity: "" },
];

const initInstructions: Instruction[] = [
  { step: 1, description: "" },
  { step: 2, description: "" },
  { step: 3, description: "" },
];

function RecipeForm({ thisuser }: { thisuser: User }) {
  const navigate = useNavigate();

  const initialState: Recipe = {
    _id: "",
    title: "",
    description: "",
    image: "",
    ingredients: initIngredients,
    instructions: initInstructions,
    tags: [""],
    ownerId: thisuser,
    updatedAt: "",
    createdAt: "",
  };

  const [formData, setFormData] = useState<Recipe>(initialState);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { title, description, image, ingredients, instructions, tags } = formData;
        const created = await recipeService.setRecipe({
            title, description, image, ingredients, instructions, tags,
        });
      navigate(`/creator`);
      console.log("created recipe:", created);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleIngredientChange = (
    index: number,
    field: keyof Ingredient,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      ingredients: prev.ingredients.map((ing, i) =>
        i === index ? { ...ing, [field]: value } : ing
      ),
    }));
  };

  const handleInstructionChange = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      instructions: prev.instructions.map((instr, i) =>
        i === index ? { ...instr, description: value } : instr
      ),
    }));
  };

  return (
    <main>
      <h2>New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} />

        <label htmlFor="description">Description:</label>
        <input type="text" id="description" name="description" value={formData.description} onChange={handleChange} />

        <label htmlFor="image">Image Link:</label>
        <input type="text" id="image" name="image" value={formData.image} onChange={handleChange} />

        <fieldset>
          <legend>Ingredients</legend>
          {formData.ingredients.map((ing, i) => (
            <div key={i}>
              <input
                type="text"
                placeholder="Name"
                value={ing.name}
                onChange={(e) => handleIngredientChange(i, "name", e.target.value)}
              />
              <input
                type="text"
                placeholder="Quantity"
                value={ing.quantity}
                onChange={(e) => handleIngredientChange(i, "quantity", e.target.value)}
              />
            </div>
          ))}
        </fieldset>

        <fieldset>
          <legend>Instructions</legend>
          {formData.instructions.map((instr, i) => (
            <div key={i}>
              <span>Step {i + 1}</span>
              <input
                type="text"
                placeholder="Description"
                value={instr.description}
                onChange={(e) => handleInstructionChange(i, e.target.value)}
              />
            </div>
          ))}
        </fieldset>

        <button type="submit">Submit</button>
      </form>
    </main>
  );
}

export default RecipeForm;