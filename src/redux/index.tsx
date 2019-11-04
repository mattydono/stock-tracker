import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import socketMiddleware from '../redux/middleware/socketMiddleware';

import { prices } from '../redux/reducers/price';
import { charts } from '../features/charts/redux/reducers/reducer';
import { companyOverview } from '../features/companyOverview/redux/reducers/reducer';
import { keyStats } from '../features/keystats/redux/reducers/reducer';
import { news } from '../features/news/redux/reducers/reducer';
import { peers } from '../features/peers/redux/reducers/reducer';
import { search } from '../features/search/redux/reducers/reducer';
import { favorites } from '../features/footer/redux/reducers/reducer';


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

export const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(socketMiddleware()),
        composeEnhancers()
    )
);