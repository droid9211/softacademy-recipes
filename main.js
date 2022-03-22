$(function() {
  const recipes = [
    {
      title: "Пица",
      calories: 260,
      type: "main",
      description: "Традиционно италианско ястие",
      image:
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      title: "Сандвич",
      calories: 320,
      type: "breakfast",
      description: "Неустоим тост с авокадо и яйца",
      image:
        "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=653&q=80"
    },
    {
      title: "Паста",
      calories: 130,
      type: "main",
      description: "Прясна паста по домашна рецепта",
      image:
        "https://images.unsplash.com/photo-1560788784-66eda82b5eb7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
    },
    {
      title: "Торта",
      calories: 450,
      type: "dessert",
      description: "Домашно приготвена торта",
      image:
        "https://images.unsplash.com/photo-1551879400-111a9087cd86?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjIxMTIzfQ&auto=format&fit=crop&w=500&q=60"
    }
  ];

  // render cards from array
  const $recipeTmplate = $('#recipe-template');
  const $recipesList = $('#recipes-list');
  const caloriesMetric = 'kcal';
  function renderRecipes(recipesArray) {
    $recipesList.html('');
    recipesArray.forEach(function(recipe) {
      const $templateClone = $recipeTmplate.clone();
      $templateClone.attr('id', '');
      $templateClone.removeClass('d-none');
      $templateClone.find('.card-title').text(recipe.title);
      $templateClone.find('.card-description').text(recipe.description);
      $templateClone.find('.card-calories').text(`${recipe.calories} ${caloriesMetric}`);
      $templateClone.find('.card-img').attr('src', recipe.image);
      $recipesList.append($templateClone);
    });
  }
  renderRecipes(recipes);

  // add recipe form and hide modal
  const $recipeForm = $('#add-recipe-form');
  $recipeForm.submit(function(event) {
    event.preventDefault();

    const recipeTitle = $recipeForm.find('input[name="title"]').val();
    const recipeImage = $recipeForm.find('input[name="image"]').val();
    const recipeCalories = $recipeForm.find('input[name="calories"]').val();
    const recipeType = $recipeForm.find('select[name="type"]').val();
    const recipeDescription = $recipeForm.find('textarea[name="description"]').val();

    const newRecipe = {
      title: recipeTitle,
      image: recipeImage,
      calories: recipeCalories,
      type: recipeType,
      description: recipeDescription
    };

    recipes.unshift(newRecipe);
    renderRecipes(recipes);
    $('#addModal').modal('hide');
    $recipeForm[0].reset();
  })

  // filter by type
  const $recipeTypeSelect = $('#food-type');
  $recipeTypeSelect.change(function() {
    const selectedType = $recipeTypeSelect.val();
    if (selectedType) {
      const filteredRecipes = recipes.filter(recipe => recipe.type === selectedType);
      renderRecipes(filteredRecipes);
    } else {
      renderRecipes(recipes);
    }
  });

  // calories range
  const $sliderRange = $( "#slider-range" );
  $sliderRange.slider({
    range: true,
    min: 0,
    max: 500,
    values: [ 75, 300 ],
    slide: function( _, ui ) {
      $( "#amount" ).text(`${ui.values[0]} - ${ui.values[1]} ${caloriesMetric}`);
    },
    change: function(_, ui) {
      const [min, max] = ui.values;
      const filteredRecipes = recipes.filter(recipe => recipe.calories >= min && recipe.calories <= max)
      renderRecipes(filteredRecipes);
    }
  });
  $( "#amount" ).text(`${$sliderRange.slider("values", 0)} - ${$sliderRange.slider("values", 1)} ${caloriesMetric}`);

  // happy coding

});
