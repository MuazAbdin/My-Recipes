import { dairyIngredients, glutenIngredients } from "./constants.js";

const checkIntersection = (arr1, arr2) => {
  return (
    arr1.filter(
      (word) => arr2.filter((sentence) => sentence.includes(word)).length === 0
    ).length === 0
  );
};

const passSensitivityFilter = (recipe, options = []) => {
  let pass = true;
  if (pass && options.includes("diary")) {
    pass = checkIntersection(recipe.ingredients, dairyIngredients);
  }
  if (pass && options.includes("gluten")) {
    pass = checkIntersection(recipe.ingredients, glutenIngredients);
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
