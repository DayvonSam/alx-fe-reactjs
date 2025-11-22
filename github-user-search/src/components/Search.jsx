import { useState, useEffect } from 'react'
import { advancedSearchUsers } from '../services/githubService'

export default function Search() {
  const [query, setQuery] = useState('')
  const [location, setLocation] = useState('')
  const [minRepos, setMinRepos] = useState('')
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)

  const search = async () => {
    setLoading(true)
    try {
      const { users: newUsers, total } = await advancedSearchUsers(query, location, minRepos, page)
      if (page === 1) setUsers(newUsers)
      else setUsers(prev => [...prev, ...newUsers])
      setHasMore(newUsers.length === 30 && users.length + newUsers.length < total)
    } catch (err) {
      setUsers([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setPage(1)
    search()
  }, [query, location, minRepos])

  useEffect(() => {
    if (page > 1) search()
  }, [page])

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">GitHub User Search</h1>

        <div className="bg-white p-8 rounded-lg shadow-lg mb-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <input
              placeholder="Username"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Min Repositories"
              value={minRepos}
              onChange={(e) => setMinRepos(e.target.value)}
              className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {loading && page === 1 && <p className="text-center text-2xl">Loading...</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {users.map(user => (
            <div key={user.id} className="bg-white rounded-lg shadow hover:shadow-xl transition p-6 text-center">
              <img src={user.avatar_url} alt={user.login} className="w-24 h-24 rounded-full mx-auto mb-4" />
              <h3 className="font-bold text-lg">{user.login}</h3>
              <a href={user.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                View Profile
              </a>
            </div>
          ))}
        </div>

        {hasMore && (
          <div className="text-center mt-10">
            <button
              onClick={() => setPage(p => p + 1)}
              disabled={loading}
              className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Loading...' : 'Load More'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
