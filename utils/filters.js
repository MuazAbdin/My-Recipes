import { sensitivitiesIngredients } from "./constants.js";
import { faker } from "@faker-js/faker";

const RATING_INTERVAL = [0, 5];

const generateRating = () => {
  return Math.floor(Math.random() * RATING_INTERVAL[1]) + RATING_INTERVAL[0];
};

const isIntersected = (recipeIngs, sensIngs) => {
  return sensIngs.filter((ing) => recipeIngs.includes(ing)).length > 0;
  // return (
  //   sensIngs.filter(
  //     (word) =>
  //       recipeIngs.filter((sentence) => sentence.includes(word)).length > 0
  //   ).length > 0
  // );
};

const passSensitivityFilter = (recipe, options = []) => {
  let pass = true;
  for (let option of options) {
    if (!pass) break;
    pass = !isIntersected(
      recipe.ingredients.map((ing) => ing.toLowerCase()),
      sensitivitiesIngredients[option].map((ing) => ing.toLowerCase())
    );
  }
  return pass;
};

const passTypeFilter = (recipe, options = []) => {
  if (options.length === 0) return true;
  return options.includes(recipe.strCategory.toLowerCase());
};

const passOriginFilter = (recipe, options = []) => {
  if (options.length === 0) return true;
  return options.includes(recipe.strArea.toLowerCase());
};

const passAllFilters = (recipe, filters) => {
  return (
    passSensitivityFilter(recipe, filters["sensitivity"]) &&
    passTypeFilter(recipe, filters["type"]) &&
    passOriginFilter(recipe, filters["origin"])
  );
};

const extractRecipes = (results, filters, page, gifs) => {
  if (!filters) filters = {};
  let recipes = results
    .filter((recipe) => passAllFilters(recipe, filters))
    .map((recipe, idx) => {
      return {
        idMeal: recipe.idMeal,
        title: recipe.title,
        ingredients: recipe.ingredients,
        // thumbnail: recipe.thumbnail,
        thumbnail: gifs[idx]?.embed_url || recipe.thumbnail,
        href: recipe.href,
        chef: faker.person.fullName(),
        rating: generateRating(),
      };
    });
  return {
    recipes: recipes.slice(page.offset, page.limit),
    count: recipes.length,
  };
};

export default extractRecipes;
