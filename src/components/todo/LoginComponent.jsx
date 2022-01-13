import React, {Component} from 'react'
import { useNavigate } from 'react-router-dom'
import AuthenticationService from './AuthenticationService.js'
import {Formik, Field, Form} from 'formik'


class LoginComponent extends Component {
   

    constructor(props) {
        super(props)
        


        this.state = {
            username: "darlingof02",
            password: '',
            hasLoginFailed: false,
            showSuccessMessage: false
        }

        this.handleChange = this.handleChange.bind(this)
        this.loginClicked = this.loginClicked.bind(this)
    }

    handleChange(event) {
        // console.log(event.target.value)
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        )
    }

    loginClicked() {
        

        AuthenticationService.executeJwtAuthenticationService(this.state.username, this.state.password)
        .then( (response) => {
                console.log(response.data.token)
                AuthenticationService.registerSuccessfulLoginForJwt(this.state.username, response.data.token)
                this.props.navigate(`/welcome/${this.state.username}`)
            }
        )
        .catch( () => {
                this.setState({
                    hasLoginFailed : true,
                    showSuccessMessage : false
                })
            }
        )
    }

    render() {
        return (
            <div>
                {/* <ShowInvalidCredential hasLoginFailed={this.state.hasLoginFailed}/>
                <ShowLoginSuccessfulMessage showSuccessMessage={this.state.showSuccessMessage}/> */}
                {this.state.hasLoginFailed && <div className='alert alert-warning'>Invalid Credentials</div>}
                {this.state.showSuccessMessage && <div>Login Successful</div>}
                <h1 className='mb-3'>Login</h1>


                <div className='container'>
                    <Formik
                    onSubmit={this.loginClicked}
                    enableReinitialize={true}
                    initialValues={this.state}>
                        <Form>
                            <div>
                                <fieldset className='mb-3'>
                                    <label>username:&nbsp;&nbsp;</label>
                                    <Field className="form" type='text' name="username" placeholder="input your username" onChange={this.handleChange}></Field>
                                </fieldset>
                            </div>
                            <div>
                                <fieldset className='mb-3'>
                                    <label>password:&nbsp;&nbsp;</label>
                                    <Field className="form" type='password' name="password" onChange={this.handleChange}></Field>
                                </fieldset>
                            </div>
                            <button className='btn btn-success'>Login</button>
                        </Form>
                    </Formik>

                    
                </div>
                
            </div>

        );
    }    
}

function WithNavigate(props) {
    let navigate = useNavigate()
    return <LoginComponent {...props} navigate={navigate} />
}

export default WithNavigate