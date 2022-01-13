import React, {Component} from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import LoginComponent from './LoginComponent'
import WelcomeComponent from './WelcomeComponent'
import ListTodosComponent from './ListTodosComponent'
import HeaderComponent from './HeaderComponent'
import FooterComponent from './FooterComponent'
import LogoutComponent from './LogoutComponent'
import PrivateRoute from './AuthenticatedRoute.jsx'
import TodoComponent from './TodoComponent'
import IndexComponent from './IndexComponent'
import SignupComponent from './SignupComponent'

class TodoApp extends Component {
    render() {
        return (
            <div className='TodoApp'>
                <Router>
                <HeaderComponent/>
                    <Routes>
                        <Route path="/" element={<IndexComponent/>}/>
                        <Route path="/login" element={<LoginComponent/>}/>
                        <Route path="/welcome/:name" 
                        element={<PrivateRoute>
                                    <WelcomeComponent/>
                                </PrivateRoute>}/>
                        <Route path="/todos" 
                        element={<PrivateRoute>
                                    <ListTodosComponent/>
                                </PrivateRoute>}/>
                        <Route path="*" element={<ErrorComponent/>}/>
                        <Route path='/logout' 
                        element={<PrivateRoute>
                                    <LogoutComponent/>
                                </PrivateRoute>}/>
                        <Route path='/todos/:id' 
                        element={<PrivateRoute>
                                    <TodoComponent/>
                                </PrivateRoute>}/>
                        <Route path="/signup" element={<SignupComponent/>}/>
                        
                                
                    </Routes>
                    <FooterComponent/>
                </Router>
                

                {/* <WelcomeComponent/>
                <LoginComponent/> */}
            </div>
        )
    }
}






function ErrorComponent() {
    return <div>An Error Occurred. I don't know what to do! Contact support at now</div>
}





// function ShowInvalidCredential(props) {
//     if(props.hasLoginFailed) {
//         return <div>Invalid Credentials</div>
//     }
//     return null
// }

// function ShowLoginSuccessfulMessage(props) {
//     if(props.showSuccessMessage) {
//         return <div>Login Successful</div>
//     }
//     return null
// }

export default TodoApp