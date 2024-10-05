import { Model } from "./model.js";
const modelInstance = new Model(); 

//A.2 - Handling network error in (fetch with async / await)
const fetchRecipes = async function(recipeName){
  try {
    const response = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${recipeName}`);
    const data = await response.json();
    modelInstance.setList(data.data.recipes);
    console.log(modelInstance.getList());
  } catch (error) {
    if (error instanceof NetworkError){
      console.error(`Network error occured while fetching recipes : ${error.message}`);
    } else {
      console.error(`Error status : ${error.status}`);
    }
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
const fetchSelectedRecipe = async function(id){
    try {
        const response = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`);
        const data = await response.json();
        modelInstance.setShownRecipe(data);
        console.log(modelInstance.getShownRecipe());
    } catch (error) {
        if (error instanceof NetworkError) {
            console.error(`Network error occured while fetching recipes : ${error.message}`);
        } else {
            console.error(`Error status : ${error.status}`);
        }
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
        resolve(modelInstance.getShownRecipe());
    }
    response.send();
};*/

export {
    fetchRecipes,
    fetchSelectedRecipe
}




