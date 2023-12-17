import axios from "axios";
import { Router } from "express";
const router = Router();

const RecipesAPIEndpoint =
  "https://recipes-goodness-elevation.herokuapp.com/recipes";

router.get("/recipes/:name", async (req, res) => {
  const name = req.params.name;
  const { results } = (
    await axios.get(`${RecipesAPIEndpoint}/ingredient/${name}`)
  ).data;
  const recipes = results.map((recipe) => {
    return {
      idMeal: recipe.idMeal,
      title: recipe.title,
      ingredients: recipe.ingredients,
      thumbnail: recipe.thumbnail,
      href: recipe.href,
    };
  });
  res.send(recipes);
});

// router.post("/", (res, req) => {});
// router.patch("/", (res, req) => {});
// router.delete("/", (res, req) => {});

export default router;
