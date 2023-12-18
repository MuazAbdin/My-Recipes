import { dairyIngredients, glutenIngredients } from "./constants.js";

const passSensitivityFilter = (recipe, options = []) => {
  let pass = true;
  if (pass && options.includes("diary")) {
    pass =
      recipe.ingredients.filter((ing) =>
        dairyIngredients.includes(ing.toLowerCase())
      ).length === 0;
  }
  if (pass && options.includes("gluten")) {
    pass =
      recipe.ingredients.filter((ing) =>
        glutenIngredients.includes(ing.toLowerCase())
      ).length === 0;
  }
  return pass;
};

const passAllFilters = (recipe, filters) => {
  return passSensitivityFilter(recipe, filters["sensitivity"]);
};

export default passAllFilters;
