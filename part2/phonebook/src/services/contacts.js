import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = async () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = async newObject => {
    const req = axios.post(baseUrl, newObject)
    const res = await req
    return res.data
}

const update = async (id, newObject) => {
    const req = axios.put(`${baseUrl}/${id}`, newObject)
    const res = await req
    return res.data
}

const del = async id => {
    const req = axios.delete(`${baseUrl}/${id}`)
    const res = await req
    return res.data
}

export default { getAll, create, update, del }
