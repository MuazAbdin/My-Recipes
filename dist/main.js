const apiManager = new APIManager();
const renderer = new Renderer();
renderer.renderOptions();

function toggleFiltersList(element) {
  const icon = $(element).find(">i");
  if (icon.hasClass("fa-angles-down")) {
    icon.removeClass("fa-angles-down");
    icon.addClass("fa-angles-up");
    $(".filter-options").show();
  } else {
    icon.removeClass("fa-angles-up");
    icon.addClass("fa-angles-down");
    $(".filter-options").hide();
  }
}

function toggleCheck(event) {
  event.stopPropagation();
  const icon = $(this).find(">i");
  if (icon.hasClass("fa-square")) {
    icon.removeClass("fa-square");
    icon.addClass("fa-square-check");
  } else {
    icon.removeClass("fa-square-check");
    icon.addClass("fa-square");
  }
}
$(".filter-options").on("click", ".option-item", toggleCheck);

const filters = $(".option-item");
function getCheckedFilters() {
  const checkedFilters = {};
  Array.from(filters)
    .filter((f) => {
      return $(f).find(">i").hasClass("fa-square-check");
    })
    .map((f) => f.id.split("-"))
    .forEach(([filterType, option]) => {
      checkedFilters[filterType] = [
        ...(checkedFilters[filterType] || []),
        option,
      ];
    });
  return checkedFilters;
}

async function showResults() {
  const ingredient = $("#ingredient-input").val();
  const checkedFilters = getCheckedFilters();
  $("#ingredient-input").val("");
  await apiManager.loadData(ingredient, checkedFilters);
  renderer.render(apiManager.data);
}

function alretIngredient(ingredient) {
  alert(ingredient);
}
