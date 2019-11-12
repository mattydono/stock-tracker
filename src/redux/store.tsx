import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { socketService } from 'services/socketService';

import { prices } from './reducers';
import { charts } from 'features/charts/redux';
import { companyOverview } from 'features/companyOverview/redux';
import { keyStats } from 'features/keystats/redux';
import { news } from 'features/news/redux';
import { peers } from 'features/peers/redux';
import { favorites } from 'features/footer/redux';
import { search } from 'features/search/redux';
import { chartMiddleware } from 'features/charts/redux/middleware'
import { searchMiddleware } from 'features/search/redux/middleware';
import { initialStartUpMiddleware } from './middleware/intialStartUpMiddleware'

const rootReducer = combineReducers({
    search,
    companyOverview,
    keyStats,
    news,
    peers,
    charts,
    favorites,
    prices,
})

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?: typeof compose // module augmentation ts
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = [
    initialStartUpMiddleware({socket: socketService}),
    chartMiddleware({socket: socketService}),
    searchMiddleware({socket: socketService})
]

export const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(...middleware),
        composeEnhancers()
    )
);