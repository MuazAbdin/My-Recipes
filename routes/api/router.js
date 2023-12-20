import axios from "axios";
import { Router } from "express";
const router = Router();
import { RecipesAPIEndpoint } from "../../utils/constants.js";
import extractRecipes from "../../utils/filters.js";

router.get("/:name", async (req, res) => {
  try {
    const name = req.params.name;
    const filters = req.query;
    const { results } = (
      await axios.get(`${RecipesAPIEndpoint}/ingredient/${name}`)
    ).data;
    const recipes = extractRecipes(results, filters);
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
