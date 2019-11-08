export interface PriceSingleDataPoint {
    ticker: string,
    latestPrice: number,
    change: number | null,
    changePercent: number | null,
    error: boolean,
}

export type Prices = PriceSingleDataPoint[];
