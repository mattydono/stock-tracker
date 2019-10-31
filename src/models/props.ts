import { _ChartSingleDataPoint } from '../components/charts/models/charts'
import { _CompanyOverview } from '../components/companyOverview/models/companyOverview'
import { _KeyStats } from '../components/keystats/models/keyStats'
import { _News } from '../components/news/models/news'
import { Range } from '../components/charts/models/range'
import { _Prices, _PriceSingleDataPoint } from './prices';

export interface _StateProps {
    companyOverview: _CompanyOverview,
    ticker: string,
    keyStats: _KeyStats,
    news: _News,
    peers: string[],
    footerProps: {
        favorites: string[],
        prices: _Prices
    }
    searchProps: {
        price: _PriceSingleDataPoint,
        primaryExchange: string | null,
        isUSMarketOpen: boolean,
        tags: string[],
        latestTime: string | null
    },
    chartProps: {
        range: Range,
        prices: _ChartSingleDataPoint[],
        ticker: string,
        latest: number,
        open: boolean,
    }
}
export interface _DispatchProps {
    search: (query: string) => void,
    updateChartRange: (range: Range) => void,
    updateChartPrices: (prices: _ChartSingleDataPoint[]) => void,
    resetState: () => void,
};
