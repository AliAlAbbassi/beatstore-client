import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    CART_UPDATED,
    CART_UPDATE_FAILED,
    PURCHASED_BEATS_UPDATED,
    PURCHASED_BEATS_UPDATE_FAILED
} from './types'
import axios from 'axios'
import { returnErrors } from './errorActions'

// Check token and load user
export const loadUser = () => (dispatch, getState) => {
    // User loading
    dispatch({ type: USER_LOADING })
    axios.get('https://4gh7fin9ub.execute-api.us-east-2.amazonaws.com/prod/beatstore/api/auth/me', tokenConfig(getState))
        .then(res => dispatch({ type: USER_LOADED, payload: res.data }))
        .catch(err => {
            dispatch(returnErrors(err.response.data.error, err.response.data.success))
            dispatch({
                type: AUTH_ERROR
            })
        })
}


// Register User
export const register = ({ name, email, password }) => (dispatch) => {
    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    }

    // Request body
    const body = JSON.stringify({ name, email, password })

    axios.post('https://4gh7fin9ub.execute-api.us-east-2.amazonaws.com/prod/beatstore/api/auth/register', body, config)
        .then(res => dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'))
            console.log(err.response)
            dispatch({
                type: REGISTER_FAIL
            })
        })
}

// Login User
export const login = ({ email, password }) => dispatch => {
    // // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    }

    // Request body
    const body = JSON.stringify({ email, password })

    axios.post('https://4gh7fin9ub.execute-api.us-east-2.amazonaws.com/prod/beatstore/api/auth/login', body, config)
        .then(res => {
            console.log(res)
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'))
            console.log(err.response)
            dispatch({
                type: LOGIN_FAIL
            })
        })
}

//Logout User
export const logout = () => {
    return {
        type: LOGOUT_SUCCESS
    }
}

// update Cart
export const updateCart = (cart) => (dispatch, getState) => {

    // clearing duplicates
    // const newCart = uniq(cart) || []
    // Request body
    const body = JSON.stringify({ cart })

    axios.put('https://4gh7fin9ub.execute-api.us-east-2.amazonaws.com/prod/beatstore/api/auth/updateCart', body, tokenConfig(getState))
        .then(res => dispatch({
            type: CART_UPDATED,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'))
            dispatch({
                type: CART_UPDATE_FAILED
            })
        })
}

// Update Purchased Beats
export const updatePurchasedBeats = (beats) => (dispatch, getState) => {
    const body = JSON.stringify({ beats })

    axios.put('https://4gh7fin9ub.execute-api.us-east-2.amazonaws.com/prod/beatstore/api/auth/updatePurchasedBeats', body, tokenConfig(getState))
        .then(res => dispatch({
            type: PURCHASED_BEATS_UPDATED,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'))
            console.log(err.response)
            dispatch({
                type: PURCHASED_BEATS_UPDATE_FAILED
            })
        })
}

// setup config/headers and token
export const tokenConfig = getState => {
    // Get token from local storafe
    const token = getState().auth.token
    // headers
    const config = {
        headers: {
            'Content-type': 'application/json',
        }
    }

    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
}
