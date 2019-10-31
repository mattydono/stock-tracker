import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';

import Root from './features/Root'

import './index.css'

import { prices } from './redux/reducers/price'
import { charts } from './features/charts/redux/reducers/reducer'
import { companyOverview } from './features/companyOverview/redux/reducers/reducer'
import { keyStats } from './features/keystats/redux/reducers/reducer'
import { news } from './features/news/redux/reducers/reducer'
import { peers } from './features/peers/redux/reducers/reducer'
import { search } from './features/search/redux/reducers/reducer'
import { favorites } from './features/footer/redux/reducers/reducer'
import socketMiddleware from './redux/middleware/socketMiddleware'

const rootReducer = combineReducers({
    search,
    companyOverview,
    keyStats,
    news,
    peers,
    charts,
    favorites,
    prices
})

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?: typeof compose // module augmentation ts
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(socketMiddleware()),
        composeEnhancers()
    )
);


ReactDOM.render(
        <Provider store={store}>
            <Root />
        </Provider>,
    document.getElementById('root'),
);
