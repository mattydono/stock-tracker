import { ChartSingleDataPoint } from '../features/charts/models/charts'
import { CompanyOverview } from '../features/companyOverview/models/companyOverview'
import { KeyStats } from '../features/keystats/models/keyStats'
import { News } from '../features/news/models/news'
import { Range } from '../features/charts/models/range'
import { Prices, PriceSingleDataPoint } from './prices';

export interface StateProps {
    companyOverview: CompanyOverview,
    ticker: string,
    keyStats: KeyStats,
    news: News,
    peers: string[],
    footerProps: {
        favorites: string[],
        prices: Prices
    }
    searchProps: {
        price: PriceSingleDataPoint,
        primaryExchange: string | null,
        isUSMarketOpen: boolean,
        tags: string[],
        latestTime: string | null
    },
    chartProps: {
        range: Range,
        prices: ChartSingleDataPoint[],
        ticker: string,
        latest: number,
        open: boolean,
    }
}
export interface DispatchProps {
    search: (query: string) => void,
    updateChartRange: (range: Range) => void,
    updateChartPrices: (prices: ChartSingleDataPoint[]) => void,
    resetState: () => void,
};
