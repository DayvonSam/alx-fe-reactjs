import { useRecipeStore } from './recipeStore'

const SearchBar = () => {
  const setSearchTerm = useRecipeStore((state) => state.setSearchTerm)

  return (
    <input
      type="text"
      placeholder="Search recipes..."
      onChange={(e) => setSearchTerm(e.target.value)}
      style={{ width: '100%', padding: '8px', margin: '10px 0' }}
    />
  )
}

export default SearchBar
