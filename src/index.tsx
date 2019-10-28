import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

import Root from './components/Root';

import './index.css'

import { prices } from './redux/reducers/price'
import { charts } from './components/charts/redux/reducers/reducer'
import { companyOverview } from './components/companyOverview/redux/reducers/reducer'
import { keyStats } from './components/keystats/redux/reducers/reducer'
import { news } from './components/news/redux/reducers/reducer'
import { peers } from './components/peers/redux/reducers/reducer'
import { search } from './components/search/redux/reducers/reducer'
import { favorites } from './components/footer/redux/reducers/reducer'

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

const store = createStore(
    rootReducer,
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);


ReactDOM.render(
        <Provider store={store}>
            <Root />
        </Provider>,
    document.getElementById('root'),
);
