class Model {
    static instance;
    
    #list = [];
    #selectedRecipe;
    #bookmarks = [];
    #addedRecipes = [];

    constructor() {
        if (Model.instance) {
            return Model.instance;
        }
        Model.instance = this;
    }

    getList() {
        return this.#list;
    }

    getShownRecipe() {
        return this.#selectedRecipe;
    }

    getBookmarks() {
        return this.#bookmarks;
    }

    getAddedRecipes() {
        return this.#addedRecipes;
    }

    setList(data) {
        this.#list = data;
    }

    setShownRecipe(data) {
        this.#selectedRecipe = data;
    }

    setBookmarks(data) {
        this.#bookmarks = data;
    }

    setAddedRecipes(data) {
        this.#addedRecipes = data;
    }
}

export { Model };
