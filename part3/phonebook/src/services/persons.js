import axios from 'axios';
const baseUrl = '/api/people'

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then(response => response.data);
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject);
    return request.then(response => response.data);
}

const purge = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`);
    return request.then();
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject);
    return request.then(response => response.data);
}

const exportedRouters = {
    getAll, 
    create,
    purge,
    update,
}

export default exportedRouters; 