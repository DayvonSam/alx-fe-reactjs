import { create } from 'zustand'

const useRecipeStore = create((set, get) => ({
  recipes: [],
  searchTerm: '',
  filteredRecipes: [],
  favorites: [],
  recommendations: [],

  // === Recipe CRUD ===
  addRecipe: (newRecipe) =>
    set((state) => ({ recipes: [...state.recipes, newRecipe] })),

  updateRecipe: (id, updatedRecipe) =>
    set((state) => ({
      recipes: state.recipes.map((r) =>
        r.id === id ? { ...r, ...updatedRecipe } : r
      ),
    })),

  deleteRecipe: (id) =>
    set((state) => ({
      recipes: state.recipes.filter((r) => r.id !== id),
    })),

  // === Search ===
  setSearchTerm: (term) => {
    set({ searchTerm: term })
    get().filterRecipes()
  },

  filterRecipes: () => {
    const { recipes, searchTerm } = get()
    set({
      filteredRecipes: recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    })
  },

  // === Favorites ===
  addFavorite: (recipeId) =>
    set((state) => ({ favorites: [...state.favorites, recipeId] })),

  removeFavorite: (recipeId) =>
    set((state) => ({
      favorites: state.favorites.filter((id) => id !== recipeId),
    })),

  // === Recommendations ===
  generateRecommendations: () => {
    const { recipes, favorites } = get()
    const recommended = recipes
      .filter((recipe) => favorites.includes(recipe.id))
      .filter(() => Math.random() > 0.5) // Mock randomness
    set({ recommendations: recommended })
  },

  setRecipes: (recipes) => set({ recipes }),
}))

export default useRecipeStore
