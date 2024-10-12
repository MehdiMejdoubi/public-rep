import { PAGINATION_DIRECTION } from "./constants.js";
import { getRecipesByKeyname, fetchSelectedRecipe } from "./controller.js";
import { Model } from "./model.js";

const listContainer = document.querySelector('.recipe-list');
const modelInstance = new Model();
const searchInput = document.querySelector('.search-input');
const searchBtn = document.querySelector('.search-button');
const previousBtn = document.querySelector('.previous-btn');
const nextBtn = document.querySelector('.next-btn');
let pageNumber = 1;
const pageNumberElement = document.querySelector('.page-number');
const helloStatement = document.querySelector('.intro-text');
const contentPage = document.querySelector('.content-page');

searchBtn.addEventListener('click', async () => {
    await getRecipesByKeyname(searchInput.value);
    renderSideList();  
    const firstRecipe = modelInstance.paginatedList[0]?.[0];

    if(firstRecipe) 
        loadRecipe(firstRecipe.id);

    pageNumber = 1;
    pageNumberElement.textContent = pageNumber;
    previousBtn.classList.add('hidden');
});

nextBtn.addEventListener('click', () => pagination(PAGINATION_DIRECTION.NEXT));

previousBtn.addEventListener('click', () => pagination(PAGINATION_DIRECTION.PREVIOUS));

window.addEventListener('load', async () => {
    await getRecipesByKeyname('pizza');
    const list = modelInstance.paginatedList[0];
    renderSideList(list);  
    const firstRecipe = modelInstance.paginatedList[0]?.[0];

    if(firstRecipe) 
        loadRecipe(firstRecipe.id);

    pageNumber = 1;
    previousBtn.classList.add('hidden');
})

function renderSideList() {
    const list = modelInstance.paginatedList[pageNumber - 1];
    listContainer.innerHTML = ''; 
    console.log(list);
    if (list && list.length > 0) {
        list.forEach(element => {
            const recipeElement = document.createElement('li');
            recipeElement.className = 'recipe-side-list-element';
            recipeElement.innerHTML = `
                <img class="recipe-side-list-img" src="${element.image_url}" alt="img">
                <div class="recipe-side-list-element-details">
                    <h1 class="recipe-side-list-element-title">${element.title.toUpperCase()}</h1>
                    <p class="recipe-side-list-element-publisher">${element.publisher}</p>
                </div>
            ` ;
            console.log(element.id);
            recipeElement.addEventListener('click', () => loadRecipe(element.id));
            listContainer.appendChild(recipeElement);
        });

        nextBtn.classList.remove('hidden');
        pageNumberElement.classList.remove('hidden');
    } else {
        listContainer.innerHTML = '<p>No recipes found</p>';
    }
}

function pagination(direction) {
    const chunkedList = modelInstance.paginatedList;

    if(direction === PAGINATION_DIRECTION.NEXT){
        pageNumberElement.textContent = ++pageNumber;
        previousBtn.classList.remove('hidden');

        if(pageNumber === chunkedList.length) nextBtn.classList.add('hidden');

    }else if (direction === PAGINATION_DIRECTION.PREVIOUS){
        pageNumberElement.textContent = --pageNumber;

        if(pageNumber === 1)
            previousBtn.classList.add('hidden');
        
    }

    renderSideList();
};

async function loadRecipe(id){
    const recipe = await fetchSelectedRecipe(id);
    helloStatement.classList.add('hidden');
    contentPage.innerHTML = '';
    contentPage.innerHTML += `
        <div class="content-page-content">
            <img class="recipe-content-img" src="${recipe.image_url}" alt="recipe-content-img">
            <div class="recipe-content-title">${recipe.title}</div>
            <div class="recipe-content-ingredients-container">
            <div class="recipe-content-ingredients">
                ${recipe.ingredients.map(item => `
                    <h3 class="ingredient">
                        <span class="material-symbols-outlined">check</span>
                        ${item.quantity ? item.quantity : ''} ${item.unit} ${item.description}
                    </h3>`).join('')}
            </div>
        </div>
    `
}
    
