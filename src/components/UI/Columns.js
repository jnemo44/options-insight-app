import { useMemo } from 'react';
import { SelectColumnFilter } from "../Trade/Table";

export function OpenTradesColumns() {
    const columns = useMemo(() => [
        {
            Header: "Ticker",
            accessor: "ticker",
        },
        {
            Header: "Open Date",
            accessor: "openDate",
            Filter: SelectColumnFilter,
            filter: 'includes',
        },
        {
            Header: "Spread",
            accessor: "spread",
        },
        {
            Header: "DTE",
            accessor: "dte",
        },
        {
            Header: "Contract",
            accessor: "numContracts",
        },
        {
            Header: "Open Price",
            accessor: "openPrice",
        },

    ], [])

    return columns;
}

export function CloseTradesColumns() {
    const columns = useMemo(() => [
        {
            Header: "Ticker",
            accessor: "ticker",
        },
        {
            Header: "Spread",
            accessor: "spread",
        },
        {
            Header: "DIT",
            accessor: "dit",
        },
        {
            Header: "Open Price",
            accessor: "openPrice",
        },
        {
            Header: "Close Price",
            accessor: "closePrice",
        },
        {
            Header: "P/L",
            accessor: "profitLoss",
        },

    ], [])

    return columns;
}
