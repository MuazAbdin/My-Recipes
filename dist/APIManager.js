class APIManager {
  /* Attributes */
  #data = [];

  constructor() {
    this.#data = {};
  }

  /* Private methods */
  static #sliceArray(array, sliceSize = 5) {
    sliceSize = array.length > 15 ? Math.ceil(array.length / 3) : sliceSize;
    let endIdx = sliceSize;
    const slicedArray = [];
    for (let i = 0; i < array.length; i += sliceSize, endIdx += sliceSize)
      slicedArray.push(array.slice(i, endIdx));
    return slicedArray;
  }

  /* Public Methods - API */
  async loadData(ingredient, filters) {
    try {
      // console.log(filters);
      this.#data = await $.ajax({
        url: `${config.apiEndpoint}/recipes/${ingredient}`,
        method: "GET",
        data: filters,
      });
      this.#data.forEach(
        (recipe) =>
          (recipe.ingredients = APIManager.#sliceArray(recipe.ingredients))
      );
    } catch (error) {
      console.log(error);
    }
  }

  get data() {
    return this.#data;
  }
}
