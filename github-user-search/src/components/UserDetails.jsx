import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getUserDetails } from '../services/githubApi'

export default function UserDetails() {
  const { username } = useParams()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getUserDetails(username)
      .then(setUser)
      .catch(() => setError('User not found'))
      .finally(() => setLoading(false))
  }, [username])

  if (loading) return <div className="text-center py-20">Loading...</div>
  if (error) return <div className="text-center text-red-500 py-20">{error}</div>

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Link to="/" className="text-blue-600 hover:underline mb-6 inline-block">
        ← Back to Search
      </Link>

      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          <img src={user.avatar_url} alt={user.login} className="w-32 h-32 rounded-full" />
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold">{user.name || user.login}</h1>
            <p className="text-xl text-gray-600">@{user.login}</p>
            {user.bio && <p className="mt-4 text-lg">{user.bio}</p>}
            <a
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              View on GitHub
            </a>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6 mt-10 text-center">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold">{user.public_repos}</p>
            <p className="text-gray-600">Repos</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold">{user.followers}</p>
            <p className="text-gray-600">Followers</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold">{user.following}</p>
            <p className="text-gray-600">Following</p>
          </div>
        </div>

        <div className="mt-8 space-y-3 text-gray-700">
          {user.location && <p>Location: {user.location}</p>}
          {user.company && <p>Company: {user.company}</p>}
          {user.blog && <p>Blog: <a href={user.blog} className="text-blue-600">{user.blog}</a></p>}
          {user.twitter_username && <p>Twitter: @{user.twitter_username}</p>}
        </div>
      </div>
    </div>
  )
}
