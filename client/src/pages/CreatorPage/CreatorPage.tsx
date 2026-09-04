import { useLocation, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import recipeService from "../../utils/recipeService";
import type { Recipe, User } from "../../shared.types";

export default function CreatorPage({ thisuser }: { thisuser: User }) {
  console.log("CreatorPage rendering, thisuser:", thisuser);
  const [myRecipes, setMyRecipes] = useState<Recipe[]>([]);
  const navigate = useNavigate();

  // in CreatorPage
const location = useLocation();

  useEffect(() => {
  console.log("thisuser in CreatorPage:", thisuser.name);
  if (!thisuser) return;
  recipeService.getRecipesByUser(thisuser._id).then((recipes) => {
    console.log("fetched recipes:", recipes);
    if (recipes) setMyRecipes(recipes);
  });
}, [thisuser, location.key]);

  function handleClick() {
    navigate("/recipeform");
  }

  return (
    <div>
      <h1>Creator Page</h1>
      <button onClick={handleClick}>ADD RECIPE</button>

      <div>
        {myRecipes.map((r) => (
          <div key={r._id}>
            <img src={r.image} alt={r.title} width={150} />
            <h3>{r.title}</h3>
            <Link to={`/recipes/${r._id}`}>
              <button>View</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}