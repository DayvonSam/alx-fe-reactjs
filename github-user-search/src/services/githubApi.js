import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.github.com',
  headers: { Accept: 'application/vnd.github.v3+json' },
})

export const searchUsers = async (query, page = 1) => {
  const res = await api.get('/search/users', {
    params: { q: query, per_page: 30, page },
  })
  return { users: res.data.items, total: res.data.total_count }
}

export const getUserDetails = async (username) => {
  const res = await api.get(`/users/${username}`)
  return res.data
}
