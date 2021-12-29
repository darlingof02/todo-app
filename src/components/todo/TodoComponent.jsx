import React, { Component } from 'react'
import moment from 'moment'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import TodoDataService from '../../api/todo/TodoDataService.js'
import AuthenticationService from './AuthenticationService.js'
import { useNavigate, useParams } from 'react-router';

class TodoComponent extends Component {
    constructor(props) {
        super(props)


        this.state = {
            id: this.props.id,
            description: '',
            targetDate: moment(new Date()).format('YYYY-MM-DD')
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)

    }

    componentDidMount() {

        if(this.props.id === -1) {
            return 
        }
        
        let username = AuthenticationService.getLoggedInUserName()
        // console.log(this.state.id)
        TodoDataService.retrieveTodo(username, this.state.id)
        .then(response => this.setState({
            description: response.data.description,
            targetDate: moment(response.data.date).utcOffset('+0100').format('YYYY-MM-DD')
        }))
        
        

    }

    validate(values) {
        // console.log(values)
        let errors = {}
        if (!values.description) {
            errors.description = 'Enter a Description'
        } else if (values.description.length < 5) {
            errors.description = 'Enter at least 5 Characters in Description'
        }

        if (!moment(values.targetDate).isValid()) {
            errors.targetDate = 'Enter a valid Target Date'
        }

        return errors

    }

    onSubmit(values) {
        let username = AuthenticationService.getLoggedInUserName()

        let todo = {
            id: this.state.id,
            description: values.description,
            date: values.targetDate
        }
        console.log(todo)

        if (this.props.id === -1) {
            TodoDataService.updateTodo(username, todo)
            .then(() => this.props.navigate("/todos"))
        }
        else {
            TodoDataService.updateTodo(username, this.state.id, todo)
            .then(() => this.props.navigate("/todos"))
        }
        
    }

    render() {

        let { description, targetDate } = this.state
        //let targetDate = this.state.targetDate

        return (
            <div>
                <h1>Todo</h1>
                <div className="container">
                    <Formik
                        initialValues={{ description, targetDate }}
                        onSubmit={this.onSubmit}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validate={this.validate}
                        enableReinitialize={true}
                    >
                        {
                            (props) => (
                                <Form>
                                    <ErrorMessage name="description" component="div"
                                        className="alert alert-warning" />
                                    <ErrorMessage name="targetDate" component="div"
                                        className="alert alert-warning" />
                                    <fieldset className="form-group mt-3">
                                        <label>Description</label>
                                        <Field className="form-control" type="text" name="description" />
                                    </fieldset>
                                    <fieldset className="form-group mt-3">
                                        <label>Target Date</label>
                                        <Field className="form-control" type="date" name="targetDate" />
                                    </fieldset>
                                    <button className="btn btn-success mt-3" type="submit">Save</button>
                                </Form>
                            )
                        }
                    </Formik>

                </div>
            </div>
        )
    }
}

function TodoFunction() {
    let navigate = useNavigate()
    const {id} = useParams()
    // console.log(id)
    return (
        <div>
            <TodoComponent id={id} navigate={navigate} />
        </div>
    )
}

export default TodoFunction