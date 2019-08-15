import { LOAD_NEWS, NEWS_API_KEY, LOADING, SEARCH_TEXT_CHANGE, API_KEY, LOAD_STOCKS, STOCK_SELECTED, FREQUENCY, LOAD_CHART_DATA, URI, LOAD_PORTIFOLIO } from './types'
import axios from 'axios'
import history from '../components/history';
import _ from 'lodash'
import moment from 'moment'

export const loadNews = () => async (dispatch) => {
    loading(dispatch, true)
    try {
        const result = await axios.get(`https://newsapi.org/v2/top-headlines?sources=financial-times&apiKey=${NEWS_API_KEY}`)
        dispatchNews(dispatch, result.data.articles)
        loading(dispatch, false)
    } catch (err) {
        console.log(err)
        loading(dispatch, false)
        return
    }
}

const dispatchNews = (dispatch, news) => {
    dispatch({
        type: LOAD_NEWS,
        payload: news
    })
}

const loading = (dispatch, input) => {
    dispatch({
        type: LOADING,
        payload: input
    })
}

export const searchTextChange = (text) => {
    return {
        type: SEARCH_TEXT_CHANGE,
        payload: text
    }
}

export const setFrequency = (frequency) => {
    return {
        type: FREQUENCY,
        payload: frequency
    }
}


export const stockSelected = (stock) => (dispatch) => {
    dispatch({
        type: STOCK_SELECTED,
        payload: stock
    })
    return history.push('/stock_selected')
}

export const loadStocksSearchResults = (text) => async (dispatch) => {
    loading(dispatch, true)

    try {
        const result = await axios.get(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${text}&apikey=${API_KEY}`)
        if (!result.data.bestMatches) {
            loading(dispatch, false)
            return dispatch({
                type: LOAD_STOCKS,
                payload: []
            })
        }

        dispatch({
            type: LOAD_STOCKS,
            payload: result.data.bestMatches.length > 0 ? result.data.bestMatches : []
        })
        loading(dispatch, false)
    } catch (err) {
        console.log(err)

        return
    }
}

export const loadChartData = (frequency, stockSymbol) => async (dispatch) => {
 
    try {
        const result = await axios.get(`https://www.alphavantage.co/query?function=${frequency}&symbol=${stockSymbol}${frequency === 'TIME_SERIES_INTRADAY' ? '&interval=5min' : ''}&apikey=${API_KEY}`)
        const dataObj = result.data[Object.keys(result.data)[1]]
        let dataArray = []
        _.map(dataObj, function (value, key) {
            moment.defaultFormat = 'YYYY-MM-DD HH:mm:ss'
            const date = moment(key, moment.defaultFormat).format('HH:mm')
            dataArray.push({ ...value, date })
        })
        const newArray = dataArray.slice(0, 20)
        dispatch({
            type: LOAD_CHART_DATA,
            payload: newArray
        })

    } catch (err) {
        console.log(err)
        return
    }
}


export const followStock = (data) => async () => {
    try {
        await axios.post(`${URI}/followStock`, data)
    } catch (err) {
        console.log(err)
        return
    }
}

export const unfollowStock = (data) => async () => {
    try {
        await axios.post(`${URI}/unfollowStock`, data)
    } catch (err) {
        console.log(err)
        return
    }
}

export const loadPortifolio = (userId) => async (dispatch) => {
    loading(dispatch, true)
    try {
        const result = await axios.get(`${URI}/fetchStocks`, { params: { userId } })
        dispatch({
            type: LOAD_PORTIFOLIO,
            payload: result.data || []
        })
        loading(dispatch, false)
    } catch (err) {
        console.log(err)
        loading(dispatch, false)
        return
    }
}

export const searchPortifolio = (text, userId) => async (dispatch) => {
    loading(dispatch, true)
    try {
        const result = await axios.get(`${URI}/searchPortifolio`, { params: { text, userId } })
        dispatch({
            type: LOAD_PORTIFOLIO,
            payload: result.data || []
        })
        loading(dispatch, false)
    } catch (err) {
        console.log(err)
        loading(dispatch, false)
        return
    }
}