import React, {Component} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

class LogoutComponent extends Component {
    render() {
        return (
            <div>
                <h1>You Are Out</h1>
                <div className='container'>
                    Thank you for using the App
                </div>
            </div>
        )
    }
}

function LogoutFunction() {
    return (
        <div>
            <LogoutComponent/>
        </div>
    )
}

export default LogoutFunction;