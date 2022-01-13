import React, {Component} from 'react'
import { Link } from 'react-router-dom';
import AuthenticationService from './AuthenticationService.js';
import { useNavigate } from 'react-router'
import { withRouter } from './withRouter.tsx';

class HeaderComponent extends Component {
    render() {
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn()
        //console.log(isUserLoggedIn)

        return (
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark" >
                    <div><a className='navbar-brand'>darlingof02</a></div>
                    <ul className="navbar-nav">
                        {isUserLoggedIn && <li className='nav-link'><Link to={'/welcome/darlingof02'} className='link'>Home</Link></li>}
                        {isUserLoggedIn && <li className='nav-link'><Link to={'/todos'} className='link'>Todos</Link></li>}
                    </ul>
                    <ul className="navbar-nav navbar-collapse justify-content-end">
                        {!isUserLoggedIn && <li className='nav-link'><Link to={'/login'} className='link'>Login</Link></li>}
                        {!isUserLoggedIn && <li className='nav-link'><Link to={'/signup'} className='link'>Sign Up</Link></li>}
                        {isUserLoggedIn && <li className='nav-link'><Link to={'/logout'} className='link' onClick={AuthenticationService.logout}>Logout</Link></li>}
                    </ul>
                </nav>
                
            </header>
        )
    }
}

// function HeaderFunction() {
//     return (
//         <div>
//             <HeaderComponent />
//         </div>
//     )
// }

export default withRouter(HeaderComponent);
// export default HeaderFunction;