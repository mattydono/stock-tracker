import { _ChartSingleDataPoint } from './charts'
import { _CompanyOverview } from './companyOverview'
import { _KeyStats } from './keyStats'
import { _News } from './news'

export interface _StateProps {
    companyOverview: _CompanyOverview,
    ticker: string,
    keyStats: _KeyStats,
    news: _News,
    peers: string[],
    chart: {
        range: string,
        prices: _ChartSingleDataPoint[]
    }
}
export interface _DispatchProps {
    search: (query: string) => void,
    updateChartRange: (range: string) => void,
    updateChartPrices: (prices: _ChartSingleDataPoint[]) => void,
    callbacks: {
        company: (company: _CompanyOverview) => void,
        quote: (quote: _KeyStats) => void,
        news: (news: _News) => void,
        peers: (peers: string[]) => void
    }
};
