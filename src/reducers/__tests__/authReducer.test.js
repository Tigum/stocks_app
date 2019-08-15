import authReducer from '../authReducer'
import {
    EMAIL_CHANGE,
    PASSWORD_CHANGE,
    NAME_CHANGE,
    LASTNAME_CHANGE,
    CONFIRM_PASSWORD_CHANGE,
    REGISTRATION_ERROR
} from '../../actions/types'

it('handles actions of type EMAIL_CHANGE', () => {
    const payload_content = 'user@email.com'
    const action = {
        type: EMAIL_CHANGE,
        payload: payload_content
    }
    const newState = authReducer({ email: '' }, action)
    expect(newState).toEqual({ email: payload_content })
})

it('handles actions of type PASSWORD_CHANGE', () => {
    const payload_content = 'password'
    const action = {
        type: PASSWORD_CHANGE,
        payload: payload_content
    }
    const newState = authReducer({ password: '' }, action)
    expect(newState).toEqual({ password: payload_content })
})

it('handles actions of type NAME_CHANGE', () => {
    const payload_content = 'userName'
    const action = {
        type: NAME_CHANGE,
        payload: payload_content
    }
    const newState = authReducer({ name: '' }, action)
    expect(newState).toEqual({ name: payload_content })
})

it('handles actions of type LASTNAME_CHANGE', () => {
    const payload_content = 'userLastName'
    const action = {
        type: LASTNAME_CHANGE,
        payload: payload_content
    }
    const newState = authReducer({ lastName: '' }, action)
    expect(newState).toEqual({ lastName: payload_content })
})

it('handles actions of type CONFIRM_PASSWORD_CHANGE', () => {
    const payload_content = 'passwordConfirmation'
    const action = {
        type: CONFIRM_PASSWORD_CHANGE,
        payload: payload_content
    }
    const newState = authReducer({ confirmPassword: '' }, action)
    expect(newState).toEqual({ confirmPassword: payload_content })
})

it('handles actions of type REGISTRATION_ERROR', () => {
    const payload_content = 'Error message'
    const action = {
        type: REGISTRATION_ERROR,
        payload: payload_content
    }
    const newState = authReducer({ error: '' }, action)
    expect(newState).toEqual({ error: payload_content })
})