import { useState } from 'react'
import { fetchUserData } from '../services/githubService'

export default function Search() {
  const [username, setUsername] = useState('')
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handelSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setUser(null)
    setLoading(true)

    try {
      const userData = await fetchUserData(username)
      setUser(userData)
    } catch (err) {
      setError('Looks like we cant find the user')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10">GitHub User Search</h1>
        
        <form onSubmit={handelSubmit} className="mb-10">
          <div className="flex gap-4">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter GitHub username..."
              className="flex-1 px-5 py-4 rounded-lg border"
              required
            />
            <button type="submit" disabled={loading} className="px-8 py-4 bg-blue-600 text-white rounded-lg">
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </form>

        {loading && <p className="text-center text-2xl">Loading...</p>}
        {error && <p className="text-center text-red-600 text-xl">{error}</p>}
        
        {user && (
          <div className="bg-white rounded-xl shadow p-8 text-center">
            <img src={user.avatar_url} alt={user.login} className="w-32 h-32 rounded-full mx-auto mb-4" />
            <h2 className="text-3xl font-bold">{user.name || user.login}</h2>
            <p className="text-xl text-gray-600">@{user.login}</p>
            <a href={user.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
              View GitHub Profile
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
