class APIManager {
  /* Attributes */
  #data = [];

  constructor() {
    this.#data = {};
  }

  /* Private methods */
  static #sliceArray(array, sliceSize = 5) {
    sliceSize =
      array.length > config.ingredientsColumns * sliceSize
        ? Math.ceil(array.length / config.ingredientsColumns)
        : sliceSize;
    let endIdx = sliceSize;
    const slicedArray = [];
    for (let i = 0; i < array.length; i += sliceSize, endIdx += sliceSize)
      slicedArray.push(array.slice(i, endIdx));
    return slicedArray;
  }

  /* Public Methods - API */
  async loadData(ingredient, filters, page) {
    const url = `${config.apiEndpoint}/recipes/${ingredient}`;
    try {
      this.#data = await $.ajax({
        url: url,
        method: "GET",
        data: { ...filters, ...page },
      });
      this.#data.recipes.forEach((recipe) => {
        recipe.ingredients = APIManager.#sliceArray(recipe.ingredients);
        recipe.email = {
          subject: encodeURI(`Check out this recipe! ${recipe.title}`),
          body: encodeURI(`Check out this recipe! ${recipe.href}`),
        };
      });
    } catch (error) {
      console.log(`${url} ${error.status} (${error.statusText})`);
      throw new Error(`${url} ${error.status} (${error.statusText})`);
    }
  }

  get data() {
    return this.#data;
  }
}
