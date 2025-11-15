import { useNavigate } from 'react-router-dom'
import { useRecipeStore } from './recipeStore'

const DeleteRecipeButton = ({ recipeId }) => {
  const deleteRecipe = useRecipeStore((state) => state.deleteRecipe)
  const navigate = useNavigate()

  const handleDelete = () => {
    deleteRecipe(recipeId)
    navigate('/')  // Go back to home after delete
  }

  return (
    <button onClick={handleDelete} style={{ color: 'red' }}>
      Delete Recipe
    </button>
  )
}

export default DeleteRecipeButton
