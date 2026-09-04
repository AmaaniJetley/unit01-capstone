import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div>
      <h1>Welcome to Spoonful</h1>
      
        <Link to="/login">Log In</Link>
        <br/>
        <Link to="/recipe">Recipes</Link>
      
    </div>
  );

  //TODO add link to recipies
  // right now link to placeholder recipe detail page
}