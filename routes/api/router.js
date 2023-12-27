import axios from "axios";
import { Router } from "express";
const router = Router();
import { RecipesAPIEndpoint, allRecipes } from "../../utils/constants.js";
import extractRecipes from "../../utils/filters.js";

router.get("/", async (req, res) => {
  try {
    const filters = req.query;
    let results = [];
    for (let id of allRecipes.IDs) {
      const result = (
        await axios.get(
          `https://recipes-goodness-elevation.herokuapp.com/recipes/id/${id}`
        )
      ).data;
      results.push(result);
    }
    const recipes = extractRecipes(results, filters);
    res.status(200).send(recipes);
  } catch (error) {
    console.log(error.message);
    res.status(error.statusCode).send({ messgae: error.message });
  }
});

router.get("/:name", async (req, res) => {
  try {
    const name = req.params.name;
    // const filters = req.query;
    const { filters, page } = req.query;
    // console.log(filters);
    // console.log(page);
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

// router.get("/drinks", async (req, res) => {
//   const drinkAlternates = [];
//   for (let id of allRecipes.IDs) {
//     const result = (
//       await axios.get(
//         `https://recipes-goodness-elevation.herokuapp.com/recipes/id/${id}`
//       )
//     ).data;
//     if (result.strDrinkAlternate)
//       drinkAlternates.push(result.strDrinkAlternate);
//   }
//   res
//     .status(200)
//     .send({ numDrinks: drinkAlternates.length, drinks: drinkAlternates });
// });

// router.get("/categories", async (req, res) => {
//   const categories = new Set();
//   for (let id of allRecipes.IDs) {
//     const result = (
//       await axios.get(
//         `https://recipes-goodness-elevation.herokuapp.com/recipes/id/${id}`
//       )
//     ).data;
//     // console.log(result.strCategory);
//     if (result.strCategory) categories.add(result.strCategory);
//   }
//   res
//     .status(200)
//     .send({ length: categories.size, categories: [...categories].sort() });
// });

// router.get("/areas", async (req, res) => {
//   const areas = new Set();
//   for (let id of allRecipes.IDs) {
//     const result = (
//       await axios.get(
//         `https://recipes-goodness-elevation.herokuapp.com/recipes/id/${id}`
//       )
//     ).data;
//     if (result.strArea) areas.add(result.strArea);
//   }
//   res.status(200).send({ length: areas.size, areas: [...areas].sort() });
// });

// router.get("/tags", async (req, res) => {
//   const tags = new Set();
//   for (let id of allRecipes.IDs) {
//     const result = (
//       await axios.get(
//         `https://recipes-goodness-elevation.herokuapp.com/recipes/id/${id}`
//       )
//     ).data;
//     result.strTags
//       ?.toLowerCase()
//       .split(",")
//       .forEach((element) => tags.add(element));
//     // if (result.strTags) tags.add(result.strTags);
//   }
//   res.status(200).send({ length: tags.size, tags: [...tags].sort() });
// });

// router.get("/", async (req, res) => {
//   const mealsIDs = new Set();
//   try {
//     let queue = ["oil"];
//     const visited = new Set();
//     while (queue.length > 0) {
//       const curIng = queue.splice(0, 1);
//       visited.add(curIng);
//       // console.log(`=> curIng: ${curIng}`);
//       // console.log(`=> visited: ${visited}`);
//       const { results } = (
//         await axios.get(
//           `https://recipes-goodness-elevation.herokuapp.com/recipes/ingredient/${curIng}`
//         )
//       ).data;
//       for (let rec of results) {
//         // console.log(`=> rec.idMeal: ${rec.idMeal}`);
//         if (mealsIDs.has(rec.idMeal)) continue;
//         mealsIDs.add(rec.idMeal);
//         // console.log(`=> mealsIDs: ${mealsIDs}`);
//         for (let ing of rec.ingredients) {
//           ing
//             .toLowerCase()
//             .split(" ")
//             .forEach((element) => {
//               if (!visited.has(element)) queue.push(element);
//             });
//         }
//         // console.log(`=> queue: ${queue}`);
//       }
//       // console.log("=======");
//     }
//     res.status(200).send({ length: mealsIDs.size, IDs: [...mealsIDs] });
//   } catch (error) {
//     console.log(error.message);
//     res.status(error.statusCode).send({ messgae: error.message });
//   }
// });

// router.get("/", async (req, res) => {
//   const IDs = [];
//   try {
//     for (let i = 52750; i < 53000; i++) {
//       const result = (
//         await axios.get(
//           `https://recipes-goodness-elevation.herokuapp.com/recipes/id/${i}`
//         )
//       ).data;
//       if (result) {
//         // console.log(result.idMeal);
//         IDs.push(result.idMeal);
//       }
//       // if (i % 50 === 0) console.log(`=>${i}<=`);
//     }

//     res.status(200).send({ length: IDs.length, IDs: IDs });
//   } catch (error) {
//     console.log(error.message);
//     res.status(error.statusCode).send({ messgae: error.message });
//   }
// });

// router.post("/", (res, req) => {});
// router.patch("/", (res, req) => {});
// router.delete("/", (res, req) => {});

export default router;
