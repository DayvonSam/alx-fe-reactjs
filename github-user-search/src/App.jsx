import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { debounce } from 'lodash'
import { searchUsers } from './services/githubApi'
import UserCard from './components/UserCard'
import UserDetails from './components/UserDetails'

export default function App() {
  const [query, setQuery] = useState('')
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const performSearch = debounce(async (q, p = 1) => {
    if (!q.trim()) {
      setUsers([])
      return
    }
    setLoading(true)
    setError('')
    try {
      const { users, total } = await searchUsers(q, p)
      setUsers(users)
      setTotalPages(Math.min(Math.ceil(total / 30), 33))
      setPage(p)
    } catch {
      setError('Search failed. Try again.')
      setUsers([])
    } finally {
      setLoading(false)
    }
  }, 500)

  useEffect(() => {
    performSearch(query, page)
  }, [query, page])

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">GitHub User Search</h1>
        </div>
      </header>

      <Routes>
        <Route
          path="/"
          element={
            <main className="max-w-7xl mx-auto px-4 py-10">
              <input
                type="text"
                placeholder="Search GitHub users..."
                className="w-full px-6 py-4 text-lg rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-300"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  setPage(1)
                }}
              />

              {loading && <p className="text-center py-10">Searching...</p>}
              {error && <p className="text-center text-red-600 py-10">{error}</p>}
              {!loading && users.length === 0 && query && <p className="text-center py-10 text-gray-600">No users found</p>}

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-10">
                {users.map((user) => (
                  <UserCard key={user.id} user={user} />
                ))}
              </div>

              {users.length > 0 && (
                <div className="flex justify-center gap-4 mt-12">
                  <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg disabled:bg-gray-400"
                  >
                    Previous
                  </button>
                  <span className="py-3 px-6">Page {page} of {totalPages}</span>
                  <button
                    onClick={() => setPage(p => p + 1)}
                    disabled={page >= totalPages}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg disabled:bg-gray-400"
                  >
                    Next
                  </button>
                </div>
              )}
            </main>
          }
        />
        <Route path="/:username" element={<UserDetails />} />
      </Routes>
    </div>
  )
}
