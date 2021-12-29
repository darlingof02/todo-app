import React, {Component} from 'react';
import {useParams, Link} from 'react-router-dom'
import HelloWordService from '../../api/todo/HelloWordService.js';


class WelcomeComponent extends Component {
    constructor(props) {
        super(props)

        this.retrieveWelcomeMessage = this.retrieveWelcomeMessage.bind(this)
        this.handleSuccessfulResponse = this.handleSuccessfulResponse.bind(this)
        this.handleError = this.handleError.bind(this)
        this.state = {
            welcomeMessage : '',
        }
    }
    render() {
        return (
            <>
                <h1>Welcome!</h1>
                <div className='container'>
                    Welcome {this.props.loginName}. 
                    you can manage your todos <Link to="/todos">here</Link>
                </div>
                <div className='container'>
                    Click Here to get a customized welcome message.
                    <button onClick={this.retrieveWelcomeMessage} className='btn btn-success'>Get Welcome Message</button>
                </div>
                <div className='container'>
                    {this.state.welcomeMessage}
                </div>
                
            </>
        )
    }

    retrieveWelcomeMessage() {
        // HelloWordService.executeHelloWorldService()
        // .then(response => this.handleSuccessfulResponse(response))
        // .catch()

        // HelloWordService.executeHelloWorldBeanService()
        // .then(response => this.handleSuccessfulResponse(response))

        HelloWordService.executeHelloWorldPathVariableService(this.props.loginName)
        .then(response => this.handleSuccessfulResponse(response))
        .catch(error => this.handleError(error))
    }

    handleSuccessfulResponse(response) {
        console.log(response)
        this.setState({
            welcomeMessage: response.data.message
        })
    }

    handleError(error) {
        // console.log(error.response)
        let errorMessage = ''
        if (error.message) {
            errorMessage += error.message
        }

        if (error.response && error.response.data) {
            errorMessage += error.response.data.message
        }
        console.log(errorMessage)

        this.setState({
            welcomeMessage: errorMessage
        })
    }
}

function WelcomeFunction() {
    const {name} = useParams();
    return(
        <div>
            <WelcomeComponent loginName = {name} />
        </div>
    )
}



export default WelcomeFunction;