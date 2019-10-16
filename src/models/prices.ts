export interface _PriceSingleDataPoint {
    ticker: string,
    latestPrice: number,
    change: number | null,
    changePercent: number | null,
}

export type _Prices = _PriceSingleDataPoint[];
