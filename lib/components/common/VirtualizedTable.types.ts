import type { ReactNode } from "react";

export type SortDirection = "asc" | "desc";

export interface VirtualizedTableColumn<T> {
    /** Stable identifier for sorting and React keys. */
    id: string;

    /** Text or UI displayed in the column header. */
    header: ReactNode;

    /** Extracts the value used for sorting. */
    accessor: (row: T) => string | number;

    /** Optional custom cell rendering. */
    cell?: (row: T, value: string | number) => ReactNode;

    /** Aligns the cell and header contents to the right. */
    align?: "left" | "right";

    /** Optional CSS width, e.g. "12rem" or "20%". */
    width?: string;

    /** Whether this column can be sorted. Defaults to true. */
    sortable?: boolean;
}

export interface VirtualizedTableProps<T> {
    data: T[];
    columns: VirtualizedTableColumn<T>[];

    /** Returns a stable, unique ID for each row. */
    getRowId: (row: T) => string;

    /** Optional initial sort configuration. */
    initialSort?: {
        columnId: string;
        direction: SortDirection;
    };

    /** Estimated fixed row height in pixels. */
    rowHeight?: number;

    /** Number of extra rows rendered above and below the viewport. */
    overscan?: number;

    /** Maximum height of the scrollable table area. */
    maxHeight?: string;

    /** Message displayed when no rows match. */
    emptyMessage?: string;
}
