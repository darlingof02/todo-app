import axios from 'axios'
import { API_URI } from '../../Constants';

export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'


class AuthenticationService {
    registerSuccessfulLogin(username, password)  {
        // console.log('registerSuccessfulLogin')
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username);
        let basicAuthHeader = this.createBasicAuthToken(username, password)
        this.setupAxiosInterceptor(basicAuthHeader)
    }

    registerSuccessfulLoginForJwt(username, token)  {
        // console.log('registerSuccessfulLogin')
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username);
        // let basicAuthHeader = this.createBasicAuthToken(username, password)
        this.setupAxiosInterceptor(this.createJWTAuthToken(token))
    }

    executeBasicAuthenticationService(username, password) {
        return axios.get(`${API_URI}/basicauth`,
            {
                headers: {authorization: this.createBasicAuthToken(username, password)}
            }
        )
    }

    executeJwtAuthenticationService(username, password) {
        return axios.post(`${API_URI}/authenticate`,
            {
                "username": username,
                "password": password
            }
        )
    }

    createBasicAuthToken(username, password) {
        return 'Basic ' + window.btoa(username + ":" + password)
    }

    createJWTAuthToken(token) {
        return 'Bearer ' + token
    }

    logout(username, password)  {
        // console.log('logoutSuccessfully')
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if (user === null)
            return false
        return true
    }

    getLoggedInUserName() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if (user == null)
            return ''
        return user
    }


    setupAxiosInterceptor(token) {

        axios.interceptors.request.use(
            (config) => {
                if (this.isUserLoggedIn()) {
                    config.headers.authorization = token
                }
                return config
            }
        )
    }
}

export default new AuthenticationService();