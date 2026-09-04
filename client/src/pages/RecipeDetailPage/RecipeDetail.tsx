import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import recipeService from "../../utils/recipeService";
import type { Recipe } from "../../shared.types";

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    if (!id) return;
    recipeService.getRecipe(id).then(setRecipe);
  }, [id]);

  if (!recipe) return <p>Loading...</p>;

  return (
    <main>
      <h2>{recipe.title}</h2>
      <img src={recipe.image} alt={recipe.title} />
      <p>{recipe.description}</p>

      <h3>Ingredients</h3>
      <ul>
        {recipe.ingredients.map((ing, i) => (
          <li key={i}>{ing.quantity} {ing.name}</li>
        ))}
      </ul>

      <h3>Instructions</h3>
      <ol>
        {recipe.instructions.map((step) => (
          <li key={step.step}>{step.description}</li>
        ))}
      </ol>

      <div>
        {recipe.tags.map((tag) => (
          <span key={tag}>#{tag} </span>
        ))}
      </div>
      <Link to={`/creator`}>
        <button>Back</button>
        </Link>
    </main>
  );
}

export default RecipeDetail;