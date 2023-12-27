import axios from "axios";
import { Router } from "express";
const router = Router();
import { RecipesAPIEndpoint, allRecipes } from "../../utils/constants.js";
import extractRecipes from "../../utils/filters.js";

router.get("/", async (req, res) => {
  try {
    const { filters, page } = req.query;
    let results = [];
    for (let id of allRecipes.IDs) {
      const result = (
        await axios.get(
          `https://recipes-goodness-elevation.herokuapp.com/recipes/id/${id}`
        )
      ).data;
      results.push(result);
    }
    const { data } = (
      await axios.get(
        `https://api.giphy.com/v1/gifs/search?api_key=${process.env.API_KEY}&q=food&limit=${results.length}`
      )
    ).data;
    const { recipes, count } = extractRecipes(results, filters, page, data);
    res.status(200).send({ recipes, count });
  } catch (error) {
    console.log(error.message);
    res.status(error.statusCode).send({ messgae: error.message });
  }
});

router.get("/:name", async (req, res) => {
  try {
    const name = req.params.name;
    const { filters, page } = req.query;
    const { results } = (
      await axios.get(`${RecipesAPIEndpoint}/ingredient/${name}`)
    ).data;
    const { data } = (
      await axios.get(
        `https://api.giphy.com/v1/gifs/search?api_key=${process.env.API_KEY}&q=food&limit=${results.length}`
      )
    ).data;
    const { recipes, count } = extractRecipes(results, filters, page, data);
    res.status(200).send({ recipes, count });
  } catch (error) {
    console.log(error.message);
    res.status(error.statusCode).send({ messgae: error.message });
  }
});

export default router;
