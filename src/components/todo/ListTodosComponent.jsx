import React, {Component} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import TodoDataService from '../../api/todo/TodoDataService.js'
import AuthenticationService from  './AuthenticationService.js'
import moment from 'moment'

class ListTodosComponent extends Component {

    constructor(props) {
        super(props)
        
        this.state = {
            todos : [],
            message: null
        }

        this.deleteTodoClicked = this.deleteTodoClicked.bind(this)
        this.refreshTodos = this.refreshTodos.bind(this)
        this.updateTodoClicked = this.updateTodoClicked.bind(this)
        this.addTodoClicked = this.addTodoClicked.bind(this)
    }
    componentDidMount() {
        this.refreshTodos()
    }

    refreshTodos() {
        let username = AuthenticationService.getLoggedInUserName();
        TodoDataService.retrieveAllTodos(username)
        .then(
            response => {
                console.log(response.data)
                this.setState({
                    todos : response.data
                })
            }
        )
        .catch()
    }

    deleteTodoClicked(id) {
        let username = AuthenticationService.getLoggedInUserName();
        // console.log(id + " " + username);
        TodoDataService.deleteTodo(username, id)
        .then (
            response => {
                this.setState({message: `Delete of todo ${id} succeed`})
                this.refreshTodos()
            }
        )
    }

    updateTodoClicked(id) {

        // console.log(`updateTodo ${id}`)
        this.props.navigate(`/todos/${id}`)
    }

    addTodoClicked() {
        this.props.navigate(`/todos/${-1}`)
    }

    render() {
        
        return (
            <div>
                <h1>List Todos</h1>
                {this.state.message && <div className='alert alert-success'>{this.state.message}</div>}
                <div className='container'>
                    <table className='table'>
                        <thead>
                            <tr>

                                <th>Description</th>
                                <th>Done</th>
                                <th>TargetDate</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.todos.map (
                                    todo => 
                                    <tr key={todo.id}>
                                        <td>{todo.description}</td>
                                        <td>{todo.done.toString()}</td>
                                        <td>{moment(todo.date).utcOffset('+0100').format('YYYY-MM-DD')}</td>
                                        <td><button className="btn btn-success" onClick={() => this.updateTodoClicked(todo.id)}>Edit</button></td>
                                        <td><button className="btn btn-warning" onClick={() => this.deleteTodoClicked(todo.id)}>Del</button></td>
                                    </tr>
                                )
                                
                            }
                            
                        </tbody>
                    </table>
                    <div className='row mt-3'>
                            <button className='btn btn-primary' onClick={this.addTodoClicked}>New</button>
                    </div>
                </div>
                
            </div>
        )
    }
}

function ListTodosFunction() {
    const {name} = useParams()
    let navigate = useNavigate();
    return (
        <div>
            <ListTodosComponent loginName = {name} navigate = {navigate}/>
        </div> 
    )
}

export default ListTodosFunction;