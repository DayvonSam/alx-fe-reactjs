import axios from 'axios'

const API_BASE = 'https://api.github.com'

export const advancedSearchUsers = async (query = '', location = '', minRepos = '', page = 1) => {
  let searchQuery = ''

  if (query) searchQuery += query
  if (location) searchQuery += `+location:${encodeURIComponent(location)}`
  if (minRepos) searchQuery += `+repos:>=${minRepos}`

  // Default to "tom" if empty (GitHub requires non-empty q)
  if (!searchQuery.trim()) searchQuery = 'tom'

  const response = await axios.get(`${API_BASE}/search/users`, {
    params: {
      q: searchQuery.trim(),
      per_page: 30,
      page,
    },
  })

  return {
    users: response.data.items || [],
    totalCount: response.data.total_count || 0,
  }
}

export const fetchUserData = async (username) => {
  const response = await axios.get(`${API_BASE}/users/${username}`)
  return response.data
}
