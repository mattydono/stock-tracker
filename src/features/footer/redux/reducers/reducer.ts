import { 
    UpdateFavoritesAddTickerAction, FAVORITES_ADD_TICKER,
    UpdateFavoritesRemoveTickerAction, FAVORITES_REMOVE_TICKER
} from '../actions'

const favoritesInitialState: string[] = ['amzn', 'msft', 'fb']

export const favorites = (
    state = favoritesInitialState,
    action: UpdateFavoritesAddTickerAction | UpdateFavoritesRemoveTickerAction
    ) => {
    const { type } = action;
    switch (type) {
        case FAVORITES_ADD_TICKER: {
            const updateFavoritesAddTickerAction = action as UpdateFavoritesAddTickerAction;
            const { payload } = updateFavoritesAddTickerAction;
            return ([
                ...state,
                payload
            ])
        }
        case FAVORITES_REMOVE_TICKER: {
            const updateFavoritesRemoveTickerAction = action as UpdateFavoritesRemoveTickerAction;
            const { payload } = updateFavoritesRemoveTickerAction;
            return state.filter(ticker => ticker !== payload)
        }
        default: {
            return state;
        }
    }
}