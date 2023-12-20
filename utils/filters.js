import { sensitivitiesIngredients } from "./constants.js";

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

const extractRecipes = (results, filters) => {
  return results
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
};

export default extractRecipes;
