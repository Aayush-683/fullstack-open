import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async (token) => {
  if (token === false) return []
  const request = await axios.get(baseUrl, { headers: { Authorization: "Bearer " + token } })
  return request.data
}

const createNew = async (blog, token) => {
  console.log(token)
  const response = await axios.post(baseUrl, blog, { headers: { Authorization: "Bearer " + token } })
  return response.data
}

const deleteBlog = async (id, token) => {
  await axios.delete(`${baseUrl}/${id}`, { headers: { Authorization: "Bearer " + token } })
}

const like = async (blog, token) => {
  const response = await axios.put(`${baseUrl}/${blog.id}`, { ...blog, likes: blog.likes + 1 }, { headers: { Authorization: "Bearer " + token } });
  return response.data
}

export default { getAll, createNew, deleteBlog, like }