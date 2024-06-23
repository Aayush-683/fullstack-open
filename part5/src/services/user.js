import axios from 'axios'
const baseUrl = '/api/users'
const loginUrl = '/api/login'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const login = async credentials => {
    const response = await axios.post(loginUrl, credentials)
    if (response.status !== 200) {
        throw new Error('Login failed')
    } else {
        return response.data
    }
}

const getUser = async token => {
    const response = await axios.get(`${baseUrl}/me`, {
        headers: {
            Authorization: "Bearer " + token
        }
    })
    return response.data
}

export default { getAll, login, getUser }
