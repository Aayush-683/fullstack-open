import axios from "axios";
const baseURL = "http://localhost:3001/anecdotes";

export const getAll = async () => {
    const response = await axios.get(baseURL);
    return response.data;
}

export const createNew = async (content) => {
    const object = { content, votes: 0 };
    const response = await axios.post(baseURL, object);
    return response.data;
}

export const update = async (newObject) => {
    const response = await axios.put(`${baseURL}/${newObject.id}`, newObject);
    return response.data;
}