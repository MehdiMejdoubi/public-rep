import { Model } from "./model.js";
const modelInstance = new Model(); 
const errorPopup = document.querySelector('.error-div');

//A.2 - Handling network error in (fetch with async / await)
const getRecipesByKeyname = async function(recipeName){
  try {
    const response = await fetch(`http://127.0.0.1:3000/recipes/recipeName/${recipeName}`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const parsed = await response.json();
    modelInstance.list = parsed;
    modelInstance.paginatedList = chunkArray(modelInstance.list, 7);
    console.log(modelInstance.paginatedList);
  } catch (error) {
      renderError(`An error occurred while fetching recipes: ${error.message}`);
  }
}

//XMLHttpRequest
/*const getRecipesByKeyname = function(recipeName) {
    const response = new XMLHttpRequest();
    response.open("GET", `https://forkify-api.herokuapp.com/api/v2/recipes?search=${recipeName}`, true);
    response.onload = function() {
        const data = JSON.parse(response.responseText);
        modelInstance.setList(data.data.recipes);
        console.log(modelInstance.list);
    };
    response.send();
};*/

//A.2 - Handling network error in (fetch with async / await)
const fetchSelectedRecipe = async function(id) {
  try {
      const response = await fetch(`http://127.0.0.1:3000/recipes/id/${id}`);
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      const parsed = await response.json();
      return parsed;
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

function chunkArray(array, size){
  const chunks = [];
  let index =  0;
  while(index < array.length){
      chunks.push(array.slice(index, index + size));
      index += size;
  }
  return chunks;
}

export {
    getRecipesByKeyname,
    fetchSelectedRecipe,
    chunkArray
}




