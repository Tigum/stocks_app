import mainReducer from '../mainReducer'
import {
    LOAD_NEWS,
    LOADING,
    SET_USER
} from '../../actions/types'

it('handles actions of type LOAD_NEWS', () => {
    const payload_content = {
        articles: [{
            title: "News test title",
            description: "News test description",
            urlToImage: "www.test.com",
        }]
    }
    const action = {
        type: LOAD_NEWS,
        payload: payload_content.articles
    }
    const newState = mainReducer({ news: [] }, action)
    expect(newState).toEqual({ news: payload_content.articles })
})


it('handles actions of type LOADING', () => {
    const payload_content = true
    const action = {
        type: LOADING,
        payload: payload_content
    }
    const newState = mainReducer({ loading: false }, action)
    expect(newState).toEqual({ loading: payload_content })
})

it('handles actions of type SET_USER', () => {

    const payload_content = {
        _id: "5c7ff20f68029345d7165680",
        email: "thiagoscolari@gmail.com",
        password: "$2a$10$IOORoRpBwaRBIwNyU/Cnsu403WzJC",
        imageUrl: "N/A",
        facebookRegistration: false,
        name: "Thiago",
        lastName: "Scolari",
        token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9"
    }
    const action = {
        type: SET_USER,
        payload: payload_content
    }
    const newState = mainReducer({ user: null }, action)
    expect(newState).toEqual({ user: payload_content })
})


