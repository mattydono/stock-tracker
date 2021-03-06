import { _ChartSingleDataPoint } from './charts'
import { _CompanyOverview } from './companyOverview'
import { _KeyStats } from './keyStats'
import { _News } from './news'
import { Range } from './range'
import { _PriceSingleDataPoint, _Favorites } from './favorites';

export interface _StateProps {
    companyOverview: _CompanyOverview,
    ticker: string,
    keyStats: _KeyStats,
    news: _News,
    peers: string[],
    favorites: _Favorites,
    chart: {
        range: Range,
        prices: _ChartSingleDataPoint[]
    }
}
export interface _DispatchProps {
    search: (query: string) => void,
    updateChartRange: (range: Range) => void,
    updateChartPrices: (prices: _ChartSingleDataPoint[]) => void,
    callbacks: {
        company: (company: _CompanyOverview) => void,
        quote: (quote: _KeyStats) => void,
        news: (news: _News) => void,
        peers: (peers: string[]) => void,
        favorites: (prices: _PriceSingleDataPoint[]) => void,
    }
};
