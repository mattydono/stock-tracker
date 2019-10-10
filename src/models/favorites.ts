export interface _PriceSingleDataPoint {
    ticker?: string,
    latestPrice?: number,
    change: number | null,
    changePercent: number | null,
}

export interface _Favorites {
    tickers: string[],
    prices: _PriceSingleDataPoint[],
}
