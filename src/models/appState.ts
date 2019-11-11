import { CompanyOverview } from '../features/companyOverview/models/companyOverview'
import { KeyStats } from '../features/keystats/models/keyStats'
import { Charts } from '../features/charts/models/charts'
import { News } from '../features/news/models/news'
import { Prices } from './prices'
import { Error } from './errors';
import { StockListItem } from 'features/search/models'

export type AppState = {
    search: string,
    companyOverview: CompanyOverview,
    keyStats: KeyStats,
    charts: Charts,
    news: News,
    peers: string[],
    favorites: string[],
    prices: Prices,
    errors: Error,
    stockList: StockListItem[],
}