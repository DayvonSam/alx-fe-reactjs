import { useState } from 'react'
import { fetchUserData } from '../services/githubService'

export default function Search() {
  const [username, setUsername] = useState('')
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setUser(null)
    setLoading(true)

    try {
      const userData = await fetchUserData(username)
      setUser(userData)
    } catch (err) {
      if (err.response?.status === 404) {
        setError('Looks like we cant find the user')
      } else if (err.response?.status === 403) {
        setError('Rate limit exceeded. Please try again later.')
      } else {
        setError('Looks like we cant find the user')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-10">
          GitHub User Search
        </h1>

        {/* Search Form */}
        <form onSubmit={handleSubmit} className="mb-10">
          <div className="flex gap-4">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter GitHub username..."
              className="flex-1 px-5 py-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </form>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-600">Loading...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-8 py-6 rounded-lg text-center">
            <p className="text-xl font-medium">{error}</p>
          </div>
        )}

        {/* Success: User Found */}
        {user && !loading && !error && (
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <img
              src={user.avatar_url}
              alt={user.login}
              className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-gray-200"
            />
            <h2 className="text-3xl font-bold text-gray-900">
              {user.name || user.login}
            </h2>
            <p className="text-xl text-gray-600 mt-2">@{user.login}</p>

            {user.bio && <p className="mt-6 text-lg text-gray-700 italic">{user.bio}</p>}

            <a
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-8 px-8 py-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
            >
              View GitHub Profile
            </a>

            <div className="mt-8 grid grid-cols-3 gap-6 text-center">
              <div>
                <p className="text-2xl font-bold text-gray-900">{user.public_repos}</p>
                <p className="text-gray-600">Repositories</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{user.followers}</p>
                <p className="text-gray-600">Followers</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{user.following}</p>
                <p className="text-gray-600">Following</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
