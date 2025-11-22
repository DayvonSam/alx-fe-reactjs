import { Link } from 'react-router-dom'

export default function UserCard({ user }) {
  return (
    <Link to={`/${user.login}`}>
      <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-6 text-center cursor-pointer">
        <img
          src={user.avatar_url}
          alt={user.login}
          className="w-24 h-24 rounded-full mx-auto mb-4"
        />
        <h3 className="text-xl font-semibold">{user.login}</h3>
        <p className="text-gray-500 capitalize">{user.type}</p>
        <p className="text-blue-600 mt-3 font-medium">View Details →</p>
      </div>
    </Link>
  )
}
