const config = {
  apiEndpoint: "http://localhost:5100",
  filters: [
    { title: "SENSITIVITY", options: ["Dairy", "Gluten"] },
    {
      title: "TYPE",
      options: ["Seafood", "Dessert", "Beef", "Vegetarian", "Chicken"],
    },
    {
      title: "ORIGIN",
      options: [
        "Canadian",
        "American",
        "French",
        "British",
        "Tunisian",
        "Italian",
        "Mexican",
        "Indian",
        "Chinese",
      ],
    },
  ],
  ingredientsColumns: 3,
};
