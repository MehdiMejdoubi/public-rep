import { fetchRecipes, fetchSelectedRecipe } from "./controller.js";
import { Model } from "./model.js";

const listContainer = document.querySelector('.recipe-list');
const modelInstance = new Model();
const searchInput = document.querySelector('.search-input');
const searchBtn = document.querySelector('.search-button');
const previousBtn = document.querySelector('.previous-btn');
const nextBtn = document.querySelector('.next-btn');
const pageNumber = document.querySelector('.page-number');
const helloStatement = document.querySelector('.intro-text');
const contentPage = document.querySelector('.content-page');

searchBtn.addEventListener('click', async () => {
    await fetchRecipes(searchInput.value);
    let chunkedList = chunkArray(modelInstance.getList(), 7);
    const list = chunkedList[0];
    renderSideList(list);  
    attachEventListeners();
    pageNumber.textContent = 1;
    previousBtn.classList.add('hidden');
});

nextBtn.addEventListener('click', () => {
    pagination('next', pageNumber.textContent);
    pageNumber.textContent++;
    attachEventListeners();
});

previousBtn.addEventListener('click', () => {
    pagination('previous', pageNumber.textContent);
    pageNumber.textContent--;
    attachEventListeners();
});

function chunkArray(array, size){
    let resultArray = [];
    let index =  0;
    while(index < array.length){
        resultArray.push(array.slice(index, index + size));
        index += size;
    }
    return resultArray;
}

function renderSideList(list) {
    listContainer.innerHTML = ''; 
    console.log(list);
    if (list && list.length > 0) {
        list.forEach(element => {
            listContainer.innerHTML += `
                <li class="recipe-side-list-element">
                    <img class="recipe-side-list-img" src="${element.image_url}" alt="img">
                    <div class="recipe-side-list-element-details">
                        <h1 class="recipe-side-list-element-title">${element.title.toUpperCase()}</h1>
                        <p class="recipe-side-list-element-publisher">${element.publisher}</p>
                    </div>
                </li>
            `;
        });
        nextBtn.classList.remove('hidden');
        pageNumber.classList.remove('hidden');
    } else {
        listContainer.innerHTML = '<p>No recipes found</p>';
    }
}

function pagination(direction, index) {
    let chunkedList = chunkArray(modelInstance.getList(), 7);
        if(direction === 'next'){
            index++;
            renderSideList(chunkedList[index-1]);
            previousBtn.classList.remove('hidden');
            if(index === chunkedList.length){
                nextBtn.classList.add('hidden');
            }
        }else if (direction === 'previous'){
            index--;
            renderSideList(chunkedList[index-1]);
            if(index === 1){
                previousBtn.classList.add('hidden');
            }
        }
};

function attachEventListeners(){
    const recipes = document.querySelectorAll('.recipe-side-list-element');
    let chunkedList = chunkArray(modelInstance.getList(), 7);
    recipes.forEach((item, index) =>
        item.addEventListener('click', async ()=> {
            await fetchSelectedRecipe(chunkedList[pageNumber.textContent - 1][index].id);
            helloStatement.classList.add('hidden');
            const retrivedRecipe = modelInstance.getShownRecipe();
            helloStatement.classList.add('hidden');
            contentPage.innerHTML = '';
            contentPage.innerHTML += `
                <div class="content-page-content">
                    <img class="recipe-content-img" src="${retrivedRecipe.data.recipe.image_url}" alt="recipe-content-img">
                    <div class="recipe-content-title">${retrivedRecipe.data.recipe.title}</div>
                    <div class="recipe-content-ingredients-container">
                    <div class="recipe-content-ingredients">
                        ${retrivedRecipe.data.recipe.ingredients.map(item => `
                            <h3 class="ingredient">
                                <span class="material-symbols-outlined">check</span>
                                ${item.quantity ? item.quantity : ''} ${item.unit} ${item.description}
                            </h3>`).join('')}
                    </div>
                </div>
            `
        })
    )
}