import React, {Component} from 'react'
import { useNavigate } from 'react-router-dom'
import AuthenticationService from './AuthenticationService.js'

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
        // console.log("click")
        
        // if ('') {
        //     // console.log("Successful")
        //     AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password)
        //     this.props.navigate(`/welcome/${this.state.username}`)
            
        // }
        // else {
        //     // console.log("Failed")
        //     this.setState({
        //         hasLoginFailed : true,
        //         showSuccessMessage : false
        //     })
        // }

        // AuthenticationService.executeBasicAuthenticationService(this.state.username, this.state.password)
        // .then( () => {
        //         AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password)
        //         this.props.navigate(`/welcome/${this.state.username}`)
        //     }
        // ).catch( () => {
        //         this.setState({
        //             hasLoginFailed : true,
        //             showSuccessMessage : false
        //         })
        //     }
        // )

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
                <h1>Login</h1>
                <div className='container'>
                    User Name: <input type="text" name="username" value={this.state.username} onChange={this.handleChange}></input>
                    Password: <input type="password" name = "password" value={this.state.password} onChange={this.handleChange}></input>
                    <button className='btn btn-success' onClick={this.loginClicked}>Login</button>
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