import axios from 'axios'
const baseUrl = 'api/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, updatedObject) => {
  return axios.put(`${baseUrl}/${id}`, updatedObject).catch(error => {
    if (error.response && error.response.status === 404) {
      throw new Error('Contacto no encontrado')
    }
    throw error
  })
}

const erase = id => {
  return axios.delete(`${baseUrl}/${id}`).catch(error => {
    console.error('Error:', error)
    throw error
  })
}

export default { getAll, create, erase, update }
