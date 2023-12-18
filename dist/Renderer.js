class Renderer {
  /* Attributes */
  #recipeTemplate;
  #optionsTemplate;

  constructor() {
    this.#registerHelpers();
    this.#registerPartials();
    this.#recipeTemplate = Handlebars.compile($("#recipe-template").html());
    this.#optionsTemplate = Handlebars.compile($("#options-template").html());
  }

  /* Private methods */
  #registerHelpers() {
    Handlebars.registerHelper("toLowerCase", function (...strings) {
      return strings
        .slice(0, strings.length - 1)
        .map((s) => s.toLowerCase())
        .join("-");
    });
  }
  #registerPartials() {}

  /* Public Methods -The API- */
  render(recipes) {
    $(".recipes-card-deck").empty();
    $(".recipes-card-deck").append(this.#recipeTemplate({ recipes }));
  }

  renderOptions() {
    $(".filter-options").empty();
    $(".filter-options").append(
      this.#optionsTemplate({ filters: config.filters })
    );
  }
}
