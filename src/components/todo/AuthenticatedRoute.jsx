import React, {Component} from 'react'
import AuthenticationService from './AuthenticationService.js';
import {Route, Redirect, Link, Navigate} from 'react-router-dom'

// class AuthenticatedRoute extends Component {
//     render() {
//         if (AuthenticationService.isUserLoggedIn()) {
//             return <Route {...this.props} />
//         } else {
//             return <Navigate to="/login" />
//         }
//     }
// }

function PrivateRoute({children}) {
    const auth = AuthenticationService.isUserLoggedIn()
    return auth ? children : <Navigate to="/login" />
}

export default PrivateRoute