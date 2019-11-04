import { CompanyOverview } from '../features/companyOverview/models/companyOverview'
import { KeyStats } from '../features/keystats/models/keyStats'
import { Charts } from '../features/charts/models/charts'
import { News } from '../features/news/models/news'
import { Prices } from './prices'

export interface AppState {
    search: string,
    companyOverview: CompanyOverview,
    keyStats: KeyStats,
    charts: Charts,
    news: News,
    peers: string[],
    favorites: string[],
    prices: Prices,
}