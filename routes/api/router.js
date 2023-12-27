import axios from "axios";
import { Router } from "express";
const router = Router();
import { RecipesAPIEndpoint, allRecipes } from "../../utils/constants.js";
import extractRecipes from "../../utils/filters.js";

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
