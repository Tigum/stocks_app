import {
    SET_USER,
    LOAD_NEWS,
    LOADING,
    SEARCH_TEXT_CHANGE,
    LOAD_STOCKS,
    STOCK_SELECTED,
    LOAD_CHART_DATA,
    LOAD_PORTIFOLIO
} from '../actions/types'

const INITIAL_STATE = {
    user: null,
    news: [],
    loading: false,
    searchText: '',
    searchResults: [],
    stockSelected: null,
    chartData: [],
    frequency: 'TIME_SERIES_INTRADAY',
    portifolio: []
};

export default (state = INITIAL_STATE, action) => {
    // console.log('action', action)
    switch (action.type) {
        case SET_USER:
            return { ...state, user: action.payload }
        case LOAD_NEWS:
            return { ...state, news: action.payload }
        case LOADING:
            return { ...state, loading: action.payload }
        case SEARCH_TEXT_CHANGE: 
            return { ...state, searchText: action.payload}
        case LOAD_STOCKS:
            return { ...state, searchResults: action.payload}
        case STOCK_SELECTED:
            return { ...state, stockSelected: action.payload}
        case LOAD_CHART_DATA:
            return { ...state, chartData: action.payload}
        case LOAD_PORTIFOLIO:
            return { ...state, portifolio: action.payload}
        default:
            return state
    }
}