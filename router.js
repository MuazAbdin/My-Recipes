import axios from "axios";
import { Router } from "express";
const router = Router();
import { RecipesAPIEndpoint } from "./utils/constants.js";
import passAllFilters from "./utils/filters.js";

router.get("/recipes/:name", async (req, res) => {
  try {
    const name = req.params.name;
    const filters = req.query;
    // console.log(filters);
    const { results } = (
      await axios.get(`${RecipesAPIEndpoint}/ingredient/${name}`)
    ).data;

    const recipes = results
      .filter((recipe) => passAllFilters(recipe, filters))
      .map((recipe) => {
        return {
          idMeal: recipe.idMeal,
          title: recipe.title,
          ingredients: recipe.ingredients,
          thumbnail: recipe.thumbnail,
          href: recipe.href,
        };
      });

    res.status(200).send(recipes);
  } catch (error) {
    console.log(error.message);
    res.status(error.statusCode).send({ messgae: error.message });
  }
});

// router.post("/", (res, req) => {});
// router.patch("/", (res, req) => {});
// router.delete("/", (res, req) => {});

export default router;
