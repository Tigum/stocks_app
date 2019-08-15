import {
    loadNews, loadStocksSearchResults
} from '../app_actions'
import {
    LOAD_NEWS, LOADING, LOAD_STOCKS
} from '../types'
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import expect from 'expect';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async functions - app_actions', () => {

    beforeEach(function () {
        moxios.install();
    });

    afterEach(function () {
        moxios.uninstall();
    });

    it('loads latest news', async (done) => {

        const data = {
            articles: [{
                title: "News test title",
                description: "News test description",
                urlToImage: "www.test.com",
            }]
        }

        moxios.wait(() => {
            const request = moxios.requests.mostRecent()
            request.respondWith({
                status: 200,
                response: data
            })
            done()
        })

        const expectedActions = [
            { type: LOADING, payload: true },
            { type: LOAD_NEWS, payload: data.articles },
            { type: LOADING, payload: false }
        ]

        const store = mockStore({ news: null })

        try {
            await store.dispatch(loadNews())
            return expect(store.getActions()).toEqual(expectedActions)
        } catch (err) {
            console.log(err)
            return
        }
    })

    it('loads stocks search resuts', async (done) => {

        const data = {
            bestMatches: [{
                symbol: "FB",
                name: "Facebook Inc.",
                type: "Equity",
                region: "United States",
                marketOpen: "09:30",
                marketClose: "16:00",
                timezone: "UTC-04",
                currency: "USD",
                matchScore: "0.7273",
            }]
        }

        moxios.wait(() => {
            const request = moxios.requests.mostRecent()
            request.respondWith({
                status: 200,
                response: data
            })
            done()
        })

        const expectedActions = [
            { type: LOADING, payload: true },
            { type: LOAD_STOCKS, payload: data.bestMatches },
            { type: LOADING, payload: false }
        ]

        const store = mockStore({ searchResults: [] })

        try {
            await store.dispatch(loadStocksSearchResults())
            return expect(store.getActions()).toEqual(expectedActions)
        } catch (err) {
            console.log(err)
            return
        }
    })


})