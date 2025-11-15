import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useRecipeStore } from './components/recipeStore'
import AddRecipeForm from './components/AddRecipeForm'
import RecipeList from './components/RecipeList'
import RecipeDetails from './components/RecipeDetails'
import SearchBar from './components/SearchBar'
import FavoritesList from './components/FavoritesList'
import RecommendationsList from './components/RecommendationsList'

function FavoriteButton({ recipeId }) {
  const { favorites, addFavorite, removeFavorite } = useRecipeStore()
  const isFavorite = favorites.includes(recipeId)

  return (
    <button
      onClick={() => (isFavorite ? removeFavorite(recipeId) : addFavorite(recipeId))}
      style={{ color: isFavorite ? 'red' : 'gray' }}
    >
      {isFavorite ? '❤️ Remove Favorite' : '♡ Add Favorite'}
    </button>
  )
}

function App() {
  return (
    <Router>
      <div style={{ padding: '20px', fontFamily: 'Arial' }}>
        <h1>Recipe Sharing App</h1>
        <nav style={{ marginBottom: '20px' }}>
          <Link to="/" style={{ marginRight: '10px' }}>Home</Link>
          <Link to="/favorites">Favorites</Link>
        </nav>

        <SearchBar />
        <AddRecipeForm />

        <Routes>
          <Route
            path="/"
            element={
              <>
                <RecipeList FavoriteButton={FavoriteButton} />
                <RecommendationsList />
              </>
            }
          />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
          <Route path="/favorites" element={<FavoritesList />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
