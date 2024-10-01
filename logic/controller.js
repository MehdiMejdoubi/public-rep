import { Model } from "./model.js";
const modelInstance = new Model(); 

const fetchRecipes = async function(recipeName){
    const response = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${recipeName}`);
    const data = await response.json();
    modelInstance.setList(data.data.recipes);
    console.log(modelInstance.getList());
}

const fetchSelectedRecipe = async function(id){
    const response = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`);
    const data = await response.json();
    modelInstance.setShownRecipe(data);
    console.log(modelInstance.getShownRecipe());
    return modelInstance.getShownRecipe();
}

export {
    fetchRecipes,
    fetchSelectedRecipe
}




