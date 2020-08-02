import axios from 'axios'
import { returnErrors } from './errorsActions'
import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from './types'

//check token and load user
export const loadUser = () => (dispatch, getState) => {
    //user loading
    dispatch({ type: USER_LOADING })

    //fetch user
    axios.get('/api/auth/user', tokenConfig(getState))
        .then(res => dispatch({ 
            type: USER_LOADED,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status))
            dispatch({
                type: AUTH_ERROR
            })
        })
}

//regiter user
export const register = ( {name, email, password} ) => (dispatch) => {
    const config = {
        headers: {
            'Content-Type':'application/json'
        }
    }
     //request body
    const body = JSON.stringify({ name, email, password}) 
    axios.post('/api/users', body, config) 
        .then(res => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL' ))
            dispatch({
                type: REGISTER_FAIL
            })
        })   

}

//setup config headers and token
export const tokenConfig = (getState) => {
     //get token from redux store
     const token = getState().auth.token
     const config = {
         headers: {
             "Content-type": "application/json" 
         }
     }
     //if token exist add to header
     if(token) {
         config.headers['x-auth-token'] = token
     }

     return config
}

//login user
export const login = ( { email, password} ) => (dispatch) => {
    const config = {
        headers: {
            'Content-Type':'application/json'
        }
    }
     //request body
    const body = JSON.stringify({ email, password}) 
    axios.post('/api/auth', body, config) 
        .then(res => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            console.log(err.response.data)
            dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL' ))
            dispatch({
                type: LOGIN_FAIL
            })
        })   
}





export const logout = () => {
    return {
        type: LOGOUT_SUCCESS
    }
}