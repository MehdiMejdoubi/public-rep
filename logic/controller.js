import { Model } from "./model.js";
const modelInstance = new Model(); 
const errorPopup = document.querySelector('.error-div');

//A.2 - Handling network error in (fetch with async / await)
const fetchRecipes = async function(recipeName){
  try {
    const response = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${recipeName}`); 
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    modelInstance.setList(data.data.recipes);
    console.log(modelInstance.getList());
  } catch (error) {
    renderError(`An error occurred while fetching recipes: ${error.message}`);
  }
}

//XMLHttpRequest
/*const fetchRecipes = function(recipeName) {
    const response = new XMLHttpRequest();
    response.open("GET", `https://forkify-api.herokuapp.com/api/v2/recipes?search=${recipeName}`, true);
    response.onload = function() {
        const data = JSON.parse(response.responseText);
        modelInstance.setList(data.data.recipes);
        console.log(modelInstance.getList());
    };
    response.send();
};*/

//A.2 - Handling network error in (fetch with async / await)
const fetchSelectedRecipe = async function(id) {
  try {
      const response = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`);
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      modelInstance.setShownRecipe(data);
      console.log(modelInstance.getShownRecipe());
  } catch (error) {
      renderError(`An error occurred: ${error.message}`);
  }
}


//XMLHttpRequest
/*const fetchSelectedRecipe = function(id){
    const response = new XMLHttpRequest();
    response.open('GET',`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`, true);
    response.onload = function(){
        const data = JSON.parse(response.responseText);
        modelInstance.setShownRecipe(data);
        console.log(modelInstance.getAddedRecipes(data));
    }
    response.send();
};*/

const renderError = function(message) {
  errorPopup.innerHTML = '';
  errorPopup.innerHTML += `<h1 class='error-message'>${message}</h1>`;
  errorPopup.classList.remove('hidden');
  setTimeout(() => {
      errorPopup.classList.add('hidden');
  }, 4500);
};

export {
    fetchRecipes,
    fetchSelectedRecipe
}




