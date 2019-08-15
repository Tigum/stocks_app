import {
    LASTNAME_CHANGE,
    CONFIRM_PASSWORD_CHANGE,
    NAME_CHANGE,
    PASSWORD_CHANGE,
    EMAIL_CHANGE,
    URI,
    REGISTRATION_ERROR,
    SET_USER
} from './types'
import axios from 'axios'
import history from '../components/history'

export const emailChange = (email) => {
    return {
        type: EMAIL_CHANGE,
        payload: email
    }
}

export const passwordChange = (password) => {
    return {
        type: PASSWORD_CHANGE,
        payload: password
    }
}

export const nameChange = (name) => {
    return {
        type: NAME_CHANGE,
        payload: name
    }
}

export const lastNameChange = (lastName) => {
    return {
        type: LASTNAME_CHANGE,
        payload: lastName
    }
}

export const confirmPasswordChange = (password) => {
    return {
        type: CONFIRM_PASSWORD_CHANGE,
        payload: password
    }
}

export const registrationError = (error) => {
    return {
        type: REGISTRATION_ERROR,
        payload: error
    }
}

export const registerNewUser = (name, lastName, email, password, confirmPassword) => async (dispatch) => {
    if (!name) return dispatchError(dispatch, 'Please inform your name')
    if (!lastName) return dispatchError(dispatch, 'Please inform your last name')
    if (!email) return dispatchError(dispatch, 'Please inform your e-mail')
    if (!password) return dispatchError(dispatch, 'Please inform your password')
    if (password !== confirmPassword) return dispatchError(dispatch, 'Password confirmation incorrect')

    const userInfo = {
        name,
        lastName,
        email,
        password
    }
    try {
        const result = await axios.post(`${URI}/signup`, userInfo)

        if (result.data.token) {
            const { token } = result.data
            try {
                await localStorage.setItem('stocks_app_token', JSON.stringify(token))
                dispatchUser(dispatch, result.data)
                dispatchError(dispatch, null)
                history.push('/home')
            } catch (err) {
                return dispatchError(dispatch, `Error logging in. Error: ${err}`)
            }
        }
    } catch (err) {
        return dispatchError(dispatch, `Error registering new user. Error: ${err}`)
    }
}

export const loginUser = (email, password) => async (dispatch) => {
    if (!email) return dispatchError(dispatch, 'Please inform e-mail')
    if (!password) return dispatchError(dispatch, 'Please inform password')

    try {
        const result = await axios.post(`${URI}/signin`, { email, password })
        if(!result) return dispatchError(dispatch, 'E-mail or password incorrect')

        if (result.data.token) {
            const { token } = result.data
            try {
                await localStorage.setItem('stocks_app_token', JSON.stringify(token))
                history.push('/home')
                dispatchUser(dispatch, result.data)
                dispatchError(dispatch, null)

            } catch (err) {
                return dispatchError(dispatch, `Error logging in. Error: ${err}`)
            }
        }
    } catch (err) {
        return dispatchError(dispatch, 'E-mail or password incorrect')
    }
}

export const logoutUser = () => async (dispatch) => {
    try {
        await localStorage.removeItem('stocks_app_token')
        history.push('/')
        dispatchUser(dispatch, null)
    } catch (err) {
        return alert('Error while logging out, please try again')
    }
}

export const checkIfUserAlreadyLoggedIn = () => async (dispatch) => {
    try {
        const token = await JSON.parse(localStorage.getItem('stocks_app_token'))
        if (token) {
            try {
                const user = await axios.get(`${URI}/loadUser`, {
                    params: {
                        token: token
                    }
                })
                if (user) {
                    dispatchUser(dispatch, user.data)
                    history.push('/home')
                }

            } catch (err) {
                console.log(err)
                return
            }

        }
    } catch (err) {
        console.log(err)
        return
    }
}

export const checkIfUserAlreadyLoggedOut = () => async (dispatch) => {
    try {
        const token = await JSON.parse(localStorage.getItem('stocks_app_token'))
        if (!token) {
            history.push('/')
        }else{
            try {
                const user = await axios.get(`${URI}/loadUser`, {
                    params: {
                        token: token
                    }
                })
                if (user) {
                    dispatchUser(dispatch, user.data)
                }

            } catch (err) {
                console.log(err)
                return
            }
        }
    } catch (err) {
        console.log(err)
        return
    }
}

const dispatchError = (dispatch, error) => {
    dispatch({
        type: REGISTRATION_ERROR,
        payload: error
    })
}

const dispatchUser = (dispatch, user) => {
    dispatch({
        type: SET_USER,
        payload: user
    })
}