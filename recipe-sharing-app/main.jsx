// Add to the end of main.jsx (after render)
import { useRecipeStore } from './components/recipeStore'
const init = () => useRecipeStore.getState().filterRecipes()
init()