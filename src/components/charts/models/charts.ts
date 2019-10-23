import { Range } from './range'
export interface _ChartSingleDataPoint {
    open?: number,
    close?: number,
    symbol?: string,
    label?: string
}

export interface _Charts {
    range: Range,
    prices: _ChartSingleDataPoint[]
}
