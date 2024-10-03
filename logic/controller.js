import { Model } from "./model.js";
const modelInstance = new Model(); 

const fetchRecipes = async function(recipeName){
    const response = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${recipeName}`);
    const data = await response.json();
    modelInstance.setList(data.data.recipes);
    console.log(modelInstance.getList());
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

const fetchSelectedRecipe = async function(id){
    const response = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`);
    const data = await response.json();
    modelInstance.setShownRecipe(data);
    console.log(modelInstance.getShownRecipe());
    return modelInstance.getShownRecipe();
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




