import { useState, useEffect } from 'react'
import { advancedSearchUsers } from '../services/githubService'

export default function Search() {
  const [query, setQuery] = useState('')
  const [location, setLocation] = useState('')
  const [minRepos, setMinRepos] = useState('')
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)

  const performSearch = async (newPage = 1) => {
    setLoading(true)
    setError('')
    try {
      const { users: newUsers, totalCount } = await advancedSearchUsers(query, location, minRepos, newPage)
      
      if (newPage === 1) {
        setUsers(newUsers)
      } else {
        setUsers(prev => [...prev, ...newUsers])
      }
      
      setHasMore(newUsers.length === 30 && users.length + newUsers.length < totalCount)
    } catch (err) {
      setError('Failed to search users')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setPage(1)
    performSearch(1)
  }, [query, location, minRepos])

  const handleLoadMore = () => {
    const nextPage = page + 1
    setPage(nextPage)
    performSearch(nextPage)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10">GitHub User Search</h1>

        {/* Advanced Search Form */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <input
              type="text"
              placeholder="Username or keyword"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="px-5 py-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Location (e.g., Lagos, Berlin)"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="px-5 py-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Min repositories"
              value={minRepos}
              onChange={(e) => setMinRepos(e.target.value)}
              className="px-5 py-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {loading && page === 1 && <p className="text-center text-2xl">Loading...</p>}
        {error && <p className="text-center text-red-600 text-xl">{error}</p>}

        {/* Results Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {users.map((user) => (
            <div key={user.id} className="bg-white rounded-xl shadow hover:shadow-xl transition p-6">
              <img src={user.avatar_url} alt={user.login} className="w-24 h-24 rounded-full mx-auto mb-4" />
              <h3 className="text-xl font-bold text-center">{user.login}</h3>
              <a href={user.html_url} target="_blank" rel="noopener noreferrer" className="block text-center text-blue-600 hover:underline mt-4">
                View Profile →
              </a>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <div className="text-center mt-12">
            <button
              onClick={handleLoadMore}
              disabled={loading}
              className="px-10 py-4 bg-blue-600 text-white text-lg rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
            >
              {loading ? 'Loading more...' : 'Load More'}
            </button>
          </div>
        )}

        {users.length === 0 && !loading && <p className="text-center text-gray-600 mt-10 text-xl">No users found</p>}
      </div>
    </div>
  )
}
