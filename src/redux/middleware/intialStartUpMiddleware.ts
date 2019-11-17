import { StockListItem } from 'features/search/models'
import { updateStockList } from 'features/search/redux'
import { AppState, MiddlewareDependencies } from 'models'
import { Middleware } from 'redux'
import { isActionOf } from 'typesafe-actions'
import { ChartSingleDataPoint } from 'features/charts/models'
import { CompanyOverview } from 'features/companyOverview/models/companyOverview'
import { KeyStats } from 'features/keystats/models/keyStats'
import { News } from 'features/news/models/news'
import { PriceSingleDataPoint } from 'models/prices'
import { bootstrapAction, errorAction, updateChartData, updateCompany, updateKeyStats, updateNews, updatePricesData } from '../actions'


export const initialStartUpMiddleware = ({socketService}: MiddlewareDependencies): Middleware<{}, AppState> => {
    return ({dispatch, getState}) => {

        const socket = socketService.get()

        socket.on('prices', (prices: PriceSingleDataPoint[]) => dispatch(updatePricesData(prices)));
        socket.on('company', (company: CompanyOverview) => dispatch(updateCompany(company)));
        socket.on('news', (news: News) => dispatch(updateNews(news)));
        socket.on('keystats', (keystats: KeyStats) => dispatch(updateKeyStats(keystats)));
        socket.on('error', (error: string) => {
            console.log(error)
            dispatch(errorAction(error))
        });
        socket.on('chart', (chartData: ChartSingleDataPoint[]) => dispatch(updateChartData(chartData)))
        socket.on('search', (stockListItems: StockListItem[]) => dispatch(updateStockList(stockListItems)))

        return (next) => (action) => {
            if (isActionOf(bootstrapAction, action)) {
                const { favorites, charts: { range }, search: { ticker }} = getState();
                socket.emit('ticker', ticker);
                socket.emit('prices', [...favorites, ticker]);
                socket.emit('chart', [ticker, range]);
            }

            return next(action)
        }
    }
}