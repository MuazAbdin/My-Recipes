class Renderer {
  /* Attributes */
  #recipeTemplate;
  #optionsTemplate;
  #paginationTemplate;

  constructor() {
    this.#registerHelpers();
    this.#registerPartials();
    this.#recipeTemplate = Handlebars.compile($("#recipe-template").html());
    this.#optionsTemplate = Handlebars.compile($("#options-template").html());
    this.#paginationTemplate = Handlebars.compile(
      $("#pagination-template").html()
    );
  }

  /* Private methods */
  #registerHelpers() {
    Handlebars.registerHelper("genOptionID", function (...strings) {
      return strings
        .slice(0, strings.length - 1)
        .map((s) => s.toLowerCase())
        .join("-");
    });

    Handlebars.registerHelper("times", function (s, e, block) {
      let accum = "";
      for (let i = s; i < e; ++i) accum += block.fn(i);
      return accum;
    });

    Handlebars.registerHelper("isCurPage", function (num, curPage) {
      return num == curPage;
    });
  }
  #registerPartials() {}

  /* Public Methods -The API- */
  render({ recipes, count }, pages, curPage) {
    $(".recipes-card-deck").empty();
    $(".recipes-card-deck").append(this.#recipeTemplate({ recipes }));
    $(".pagination").empty();
    $(".pagination").append(
      this.#paginationTemplate({ pages, count, curPage })
    );
  }

  renderOptions() {
    $(".filter-options").empty();
    $(".filter-options").append(
      this.#optionsTemplate({ filters: config.filters })
    );
  }

  renderKitchenSize(size) {
    $(".kitchen-size")[0].innerText = size;
  }
}
