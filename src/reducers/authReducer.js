import {
    EMAIL_CHANGE,
    PASSWORD_CHANGE,
    NAME_CHANGE,
    LASTNAME_CHANGE,
    CONFIRM_PASSWORD_CHANGE,
    REGISTRATION_ERROR
} from '../actions/types'

const INITIAL_STATE = {
    email: '',
    password: '',
    name: '',
    lastName: '',
    confirmPassword: '',
    error: null
};

export default (state = INITIAL_STATE, action) => {
    // console.log('action', action)
    switch (action.type) {
        case EMAIL_CHANGE:
            return { ...state, email: action.payload }
        case PASSWORD_CHANGE:
            return { ...state, password: action.payload}
        case NAME_CHANGE:
            return { ...state, name: action.payload}
        case LASTNAME_CHANGE:
            return { ...state, lastName: action.payload}
        case CONFIRM_PASSWORD_CHANGE:
            return { ...state, confirmPassword: action.payload}
        case REGISTRATION_ERROR:
            return { ...state, error: action.payload}
        default:
            return state
    }
}

