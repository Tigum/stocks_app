import {
    emailChange,
    passwordChange,
    nameChange,
    lastNameChange,
    confirmPasswordChange,
    registrationError,
    registerNewUser,
    loginUser,
    checkIfUserAlreadyLoggedIn,
    checkIfUserAlreadyLoggedOut,
    logoutUser
} from '../auth_actions'
import {
    PASSWORD_CHANGE,
    EMAIL_CHANGE,
    NAME_CHANGE,
    LASTNAME_CHANGE,
    CONFIRM_PASSWORD_CHANGE,
    REGISTRATION_ERROR,
    SET_USER
} from '../types'
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import expect from 'expect';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('emailLoginChange', () => {
    it('has the correct type', () => {
        const action = emailChange();
        expect(action.type).toEqual(EMAIL_CHANGE)
    })

    it('has the correct payload', () => {
        const action = emailChange('newuser@email.com');
        expect(action.payload).toEqual('newuser@email.com')
    })
})

describe('passwordChange', () => {
    it('has the correct type', () => {
        const action = passwordChange();
        expect(action.type).toEqual(PASSWORD_CHANGE)
    })

    it('has the correct payload', () => {
        const action = passwordChange('password');
        expect(action.payload).toEqual('password')
    })
})

describe('nameChange', () => {
    it('has the correct type', () => {
        const action = nameChange();
        expect(action.type).toEqual(NAME_CHANGE)
    })

    it('has the correct payload', () => {
        const action = nameChange('userName');
        expect(action.payload).toEqual('userName')
    })
})

describe('lastNameChange', () => {
    it('has the correct type', () => {
        const action = lastNameChange();
        expect(action.type).toEqual(LASTNAME_CHANGE)
    })

    it('has the correct payload', () => {
        const action = lastNameChange('userLastName');
        expect(action.payload).toEqual('userLastName')
    })
})

describe('confirmPasswordChange', () => {
    it('has the correct type', () => {
        const action = confirmPasswordChange();
        expect(action.type).toEqual(CONFIRM_PASSWORD_CHANGE)
    })

    it('has the correct payload', () => {
        const action = confirmPasswordChange('passwordConfirmation');
        expect(action.payload).toEqual('passwordConfirmation')
    })
})

describe('registrationError', () => {
    it('has the correct type', () => {
        const action = registrationError();
        expect(action.type).toEqual(REGISTRATION_ERROR)
    })

    it('has the correct payload', () => {
        const action = registrationError('Error message');
        expect(action.payload).toEqual('Error message')
    })
})

describe('async functions', () => {

    beforeEach(function () {
        moxios.install();
    });

    afterEach(function () {
        moxios.uninstall();
    });

    it('correctly registers new user', async (done) => {

        const userInfo = {
            email: "thiagoscolari@gmail.com",
            password: "123456",
            name: "Thiago",
            lastName: "Scolari",
            confirmPassword: "123456"
        }

        const { email, password, name, lastName, confirmPassword } = userInfo

        const newUser = {
            _id: "5c7ff20f68029345d7165680",
            email: "thiagoscolari@gmail.com",
            password: "$2a$10$IOORoRpBwaRBIwNyU/Cnsu403WzJC",
            imageUrl: "N/A",
            facebookRegistration: false,
            name: "Thiago",
            lastName: "Scolari",
            token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9"
        }

        moxios.wait(() => {
            const request = moxios.requests.mostRecent()
            request.respondWith({
                status: 200,
                response: newUser
            })
            done()
        })

        const expectedActions = [
            {type: SET_USER, payload: newUser},
            {type: REGISTRATION_ERROR, payload: null}
        ]

        const store = mockStore({ user: null})

        try{
            await store.dispatch(registerNewUser(name, lastName, email, password, confirmPassword))
            return expect(store.getActions()).toEqual(expectedActions)
        }catch(err){
            console.log(err)
            return
        }
    })


    it('correctly logs user in', async (done) => {
        const userInfo = {
            email: 'thiagoscolari@gmail.com',
            password: '123456'
        }

        const { email, password } = userInfo

        const loggedUser = {
            _id: "5c7ff20f68029345d7165680",
            email: "thiagoscolari@gmail.com",
            password: "$2a$10$IOORoRpBwaRBIwNyU/Cnsu403WzJC",
            imageUrl: "N/A",
            facebookRegistration: false,
            name: "Thiago",
            lastName: "Scolari",
            token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ92"
        }

        moxios.wait(() => {
            const request = moxios.requests.mostRecent()
            request.respondWith({
                status: 200,
                response: loggedUser
            })
            done()
        })

        const expectedActions = [
            {type: SET_USER, payload: loggedUser},
            {type: REGISTRATION_ERROR, payload: null}
        ]

        const store = mockStore({ user: null})

        try{
            await store.dispatch(loginUser(email, password))
            return expect(store.getActions()).toEqual(expectedActions)
        }catch(err){
            console.log(err)
            return
        }

    })


    it('checks if user is logged in', async (done) => {

        const loggedUser = {
            _id: "5c7ff20f68029345d7165680",
            email: "thiagoscolari@gmail.com",
            password: "$2a$10$IOORoRpBwaRBIwNyU/Cnsu403WzJC",
            imageUrl: "N/A",
            facebookRegistration: false,
            name: "Thiago",
            lastName: "Scolari",
            token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ92"
        }

        moxios.wait(() => {
            const request = moxios.requests.mostRecent()
            request.respondWith({
                status: 200,
                response: loggedUser
            })
            done()
        })

        const expectedActions = [
            {type: SET_USER, payload: loggedUser},
        ]

        const store = mockStore({ user: null})

        try{
            await store.dispatch(checkIfUserAlreadyLoggedIn())
            return expect(store.getActions()).toEqual(expectedActions)
        }catch(err){
            console.log(err)
            return
        }
    })

    it('checks if user has successfully logged out', async () => {

        const expectedActions = [
            {type: SET_USER, payload: null}
        ]

        const store = mockStore({ user: null })

        try{
            await store.dispatch(logoutUser())
            return expect(store.getActions()).toEqual(expectedActions)
        }catch(err){
            console.log(err)
            return
        }
    })

    
})