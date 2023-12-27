const apiManager = new APIManager();
const renderer = new Renderer();
renderer.renderOptions();
let curPage = 1;

function toggleFiltersList(element) {
  const icon = $(element || ".filters-list").find(">i");
  if (element && icon.hasClass("fa-angles-down")) {
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

$(".pagination").on("click", ".page-num-btn", function () {
  curPage = parseInt(this.innerText);
  // [...$(".page-num-btn")].forEach((btn) => {
  //   // $(btn).data("active", "true");
  //   console.log($(btn).data().active);
  //   $(btn).data().active = this === btn;
  //   console.log($(btn).data().active);
  // });
  showResults(false);
});

function goLeft() {
  if ($(this).disable) return;
  curPage--;
  showResults(false);
}

function goRight() {
  if ($(this).disable) return;
  curPage++;
  showResults(false);
}

async function showResults(isNewSearch) {
  const ingredient = $("#ingredient-input").val();
  const checkedFilters = getCheckedFilters();
  // $("#ingredient-input").val("");
  toggleFiltersList(null);
  if (isNewSearch) curPage = 1;
  offset = (curPage - 1) * config.itemsPerPage;
  limit = offset + config.itemsPerPage;
  const page = { offset, limit };
  await apiManager.loadData(ingredient, checkedFilters, page);
  const pages = Math.ceil(apiManager.data.count / config.itemsPerPage);
  // console.log(curPage);
  renderer.render(apiManager.data, pages + 1, curPage);

  const goLeftBtn = $(".page-left");
  const goRightBtn = $(".page-right");
  if (curPage == 1) goLeftBtn.prop("disabled", true);
  else goLeftBtn.prop("disabled", false);
  if (curPage == pages) goRightBtn.prop("disabled", true);
  else goRightBtn.prop("disabled", false);
}
