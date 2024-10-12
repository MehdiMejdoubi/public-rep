class Model {
    static instance;
    
    list = [];
    paginatedList = [];
    #selectedRecipe;
    #bookmarks = [];
    #addedRecipes = [];

    constructor() {
        if (Model.instance) {
            return Model.instance;
        }
        Model.instance = this;
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
