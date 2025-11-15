import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import AddRecipeForm from './components/AddRecipeForm'
import RecipeList from './components/RecipeList'
import RecipeDetails from './components/RecipeDetails'

function App() {
  return (
    <Router>
      <div>
        <h1>Recipe Sharing App</h1>
        <nav>
          <Link to="/">Home</Link>
        </nav>
        <AddRecipeForm />
        <Routes>
          <Route path="/" element={<RecipeList />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
