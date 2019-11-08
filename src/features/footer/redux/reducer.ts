import { 
    UpdateFavoritesAddTickerAction, FAVORITES_ADD_TICKER,
    UpdateFavoritesRemoveTickerAction, FAVORITES_REMOVE_TICKER
} from './actions'

const favoritesInitialState: string[] = ['amzn', 'msft', 'fb']

export const favorites = (
    state = favoritesInitialState,
    action: UpdateFavoritesAddTickerAction | UpdateFavoritesRemoveTickerAction
    ) => {
    const { type, payload } = action;
    switch (type) {
        case FAVORITES_ADD_TICKER: {
            return ([
                ...state,
                payload
            ])
        }
        case FAVORITES_REMOVE_TICKER: {
            return state.filter(ticker => ticker !== payload)
        }
        default: {
            return state;
        }
    }
}