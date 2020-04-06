import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import jwtDecode from 'jwt-decode'

const isAuthenticated = () => {
    const token = window.localStorage.getItem('authToken')

    if (token) {
        const { exp: expiration } = jwtDecode(token)
        //* 1000 pour transformer secondes en millisecondes
        if (expiration * 1000 > new Date().getTime()) {
            axios.defaults.headers['Authorization'] = `Bearer ${token}`
            return true
        }
    }
    return false
}

const initialState = {
    isFetching: false,
    isLogged: isAuthenticated()
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: state => { state.isFetching = true },
        loginSuccess: state => {
            state.isFetching = false
            state.isLogged = true
        },
        loginError: state => { state.isFetching = false },
        logout: state => { state.isLogged = false }
    }
})

export const { login, loginSuccess, loginError, logout } = authSlice.actions

export default authSlice.reducer

export const loginAttempt = credentials => async dispatch => {
    dispatch(login())
    try {
        const token = await axios.post('http://127.0.0.1:8000/api/login_check', credentials)
          .then(response => {
              return response.data.token
          })

        window.localStorage.setItem('authToken', token)
        axios.defaults.headers['Authorization'] = `Bearer ${token}`

        dispatch(loginSuccess())
    } catch (e) {
        dispatch(loginError())
        throw e
    }
}