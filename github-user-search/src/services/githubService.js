import axios from 'axios'

export const advancedSearchUsers = async (query = '', location = '', minRepos = '', page = 1) => {
  let q = query.trim()

  if (location) q += ` location:${location}`
  if (minRepos) q += ` repos:>=${minRepos}`
  if (!q.trim()) q = 'tom'

  const response = await axios.get('https://api.github.com/search/users', {
    params: {
      q: q.trim(),
      per_page: 30,
      page,
    },
  })

  return {
    users: response.data.items || [],
    total: response.data.total_count || 0,
  }
}

export const fetchUserData = async (username) => {
  const response = await axios.get(`https://api.github.com/users/${username}`)
  return response.data
}
