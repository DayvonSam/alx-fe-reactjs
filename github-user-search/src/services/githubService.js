import axios from 'axios'

/**
 * Fetch user data from GitHub API by username
 * Endpoint: https://api.github.com/users/{username}
 */
export const fetchUserData = async (username) => {
  if (!username.trim()) {
    throw new Error('Username is required')
  }

  const response = await axios.get(`https://api.github.com/users/${username}`)
  return response.data
}

