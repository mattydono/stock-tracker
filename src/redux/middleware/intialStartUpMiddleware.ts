import { Middleware } from 'redux'
import { BOOTSTRAP } from '../actions'
import { PriceSingleDataPoint } from '../../models/prices'
import { CompanyOverview } from '../../features/companyOverview/models/companyOverview'
import { News } from '../../features/news/models/news'
import { KeyStats } from '../../features/keystats/models/keyStats'
import { ChartSingleDataPoint } from '../../features/charts/models'
import { StockListItem } from 'features/search/models'
import { updateStockList } from 'features/search/redux'
import { 
    updatePricesData,
    updateChartData,
    updateCompany,
    updateKeyStats,
    updateNews,
    errorAction,
} from '../actions';
import { MiddlewareDependencies } from 'models'


export const initialStartUpMiddleware = ({socket, defaultTicker = 'aapl'}: MiddlewareDependencies): Middleware => {
    return ({dispatch, getState}) => {

        const Socket = socket.get()

        Socket.on('prices', (prices: PriceSingleDataPoint[]) => dispatch(updatePricesData(prices)));
        Socket.on('company', (company: CompanyOverview) => dispatch(updateCompany(company)));
        Socket.on('news', (news: News) => dispatch(updateNews(news)));
        Socket.on('keystats', (keystats: KeyStats) => dispatch(updateKeyStats(keystats)));
        Socket.on('error', (error: string) => dispatch(errorAction(error)));
        Socket.on('chart', (chartData: ChartSingleDataPoint[]) => dispatch(updateChartData(chartData)))
        Socket.on('search', (stockListItems: StockListItem[]) => dispatch(updateStockList(stockListItems)))

        return (next) => (action) => {
            if (action.type === BOOTSTRAP) {
                const { favorites, charts: { range } } = getState();
                Socket.emit('ticker', defaultTicker);
                Socket.emit('prices', [...favorites, defaultTicker]);
                Socket.emit('chart', [defaultTicker, range]);
            }

            return next(action)
        }
    }
}