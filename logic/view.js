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
    renderSideList();  
    attachListEventListeners(); 
});

function renderSideList() {
    listContainer.innerHTML = ''; 
    const list = modelInstance.getList().slice(0, 7);

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

function attachListEventListeners() {
    const list = document.querySelectorAll('.recipe-side-list-element');

    list.forEach((item, index) => {
        item.addEventListener('click', async () => {
            try {
                await fetchSelectedRecipe(modelInstance.getList()[index].id);
                const recipee = modelInstance.getList()[index].id;
                helloStatement.classList.add('hidden');
                contentPage.innerHTML += `
                    <img src="" alt="">
                    <h1 class="selected-recipe-title"></h1>
                    <div>
                        <h2 class="duration"></h2>
                        <h2 class="servings"></h2>
                        <button class="bookmarks"></button>
                    </div>
                    <div class="ingredients">
                        <h1 class="ingredients-title">RECIPE INGRIDIENTS</h1>
                        <ul class="ingredients-list-ul">
                        </ul>
                    </div>
                `
            } catch (error) {
                console.error('Error fetching the recipe:', error);
            }
        });
    });
}
