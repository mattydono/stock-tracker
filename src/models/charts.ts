export type _ChartsRange = string

export interface _ChartSingleDataPoint {
    open: number,
    close: number
}

export interface _Charts {
    range: _ChartsRange,
    prices: _ChartSingleDataPoint[]
}
