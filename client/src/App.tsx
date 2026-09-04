// src/App.tsx
import { Route, Routes, Navigate } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import HomePage from "./pages/HomePage/HomePage";
import RecipeFormPage from "./pages/RecipeFormPage/RecipeFormPage";
import CreatorPage from "./pages/CreatorPage/CreatorPage";
import RecipeDetail from "./pages/RecipeDetailPage/RecipeDetail";
import type { User } from "./shared.types";

import userService from "./utils/userService";
//import tokenService from "./utils/tokenService";

function App() {
  const [user, setUser] = useState<User | null>(userService.getUser());

  function handleSignUpOrLogin() {
    setUser(userService.getUser());
  }

  console.log("user in App:", user);

  if (!user) {
    return (
    <Routes>
      <Route
        path="/signup"
        element={<SignupPage handleSignUpOrLogin={handleSignUpOrLogin} />}
      />
      <Route
          path="/login"
          element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin} />}
        />
      <Route
          path="/"
          element={<HomePage/>}
        />
        <Route path="/recipe" element={<RecipeDetail/>} />
        <Route path="/recipes/:id" element={<RecipeDetail />} />
        <Route path="*" element={<Navigate to="/" />} />
    </Routes>
    );
  }

  //TODO make 404 not found page

  return (
    <Routes>
      <Route
        path="/signup"
        element={<SignupPage handleSignUpOrLogin={handleSignUpOrLogin} />}
      />
      <Route
          path="/login"
          element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin} />}
        />
      <Route
        path="/creator"
        element={<CreatorPage thisuser={user} />}
      />
      <Route
          path="/recipeform"
          element={<RecipeFormPage thisuser={user}/>}
        />
      <Route
          path="/"
          element={<HomePage/>}
        />
        <Route path="/recipe" element={<RecipeDetail />} />
        <Route path="/recipes/:id" element={<RecipeDetail />} />
        <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
