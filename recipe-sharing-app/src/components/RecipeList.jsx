import { Link } from 'react-router-dom'
import { useRecipeStore } from './recipeStore'

const RecipeList = ({ FavoriteButton }) => {
  const filteredRecipes = useRecipeStore((state) => state.filteredRecipes)

  return (
    <div>
      {filteredRecipes.map((recipe) => (
        <div key={recipe.id} style={{ borderBottom: '1px solid #ccc', padding: '10px 0' }}>
          <h3>
            <Link to={`/recipe/${recipe.id}`}>{recipe.title}</Link>
          </h3>
          <p>{recipe.description}</p>
          {FavoriteButton && <FavoriteButton recipeId={recipe.id} />}
        </div>
      ))}
    </div>
  )
}

export default RecipeList
