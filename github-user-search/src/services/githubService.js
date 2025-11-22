import axios from 'axios'

export const fetchUserData = async (username) => {
  if (!username.trim()) throw new Error('Username is required')
  const response = await axios.get(`https://api.github.com/users/${username}`)
  return response.data
}
