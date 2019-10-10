export interface _PriceSingleDataPoint {
    ticker?: string,
    latestPrice?: number,
    change?: number,
    changePercent?: number,
}

export interface _Favorites {
    tickers: string[],
    prices: _PriceSingleDataPoint[],
}
