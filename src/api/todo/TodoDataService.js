import axios from 'axios'
import { API_URI, JPA_API_URI } from '../../Constants';


class TodoDataService {
    retrieveAllTodos(username) {
        return axios.get(`${JPA_API_URI}/users/${username}/todos`)
    }

    deleteTodo(name, id) {
        return axios.delete(`${JPA_API_URI}/users/${name}/todos/${id}`)
    }

    retrieveTodo(name, id) {
        return axios.get(`${JPA_API_URI}/users/${name}/todos/${id}`)
    }

    updateTodo(name, id, todo) {
        return axios.put(`${JPA_API_URI}/users/${name}/todos/${id}`, todo)
    }

    createTodo(name, todo) {
        return axios.post(`${JPA_API_URI}/users/${name}/todos`, todo)
    }
}

export default new TodoDataService()