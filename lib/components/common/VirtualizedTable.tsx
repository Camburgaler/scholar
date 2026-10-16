import type {
    SortDirection,
    VirtualizedTableColumn,
    VirtualizedTableProps,
} from "@/lib/components/common/VirtualizedTable.types";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useMemo, useRef, useState, type CSSProperties } from "react";

interface SortState {
    columnId: string;
    direction: SortDirection;
}

function compareValues(left: string | number, right: string | number): number {
    if (typeof left === "number" && typeof right === "number") {
        return left - right;
    }

    return String(left).localeCompare(String(right));
}

export default function VirtualizedTable<T>({
    data,
    columns,
    getRowId,
    initialSort,
    rowHeight = 30,
    overscan = 5,
    maxHeight = "32rem",
    emptyMessage = "No results found.",
}: VirtualizedTableProps<T>) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const [sort, setSort] = useState<SortState | null>(initialSort ?? null);

    const sortedData = useMemo(() => {
        if (!sort) {
            return data;
        }

        const column = columns.find(
            (candidate) => candidate.id === sort.columnId,
        );

        if (!column || column.sortable === false) {
            return data;
        }

        return [...data].sort((left, right) => {
            const comparison = compareValues(
                column.accessor(left),
                column.accessor(right),
            );

            return sort.direction === "asc" ? comparison : -comparison;
        });
    }, [data, columns, sort]);

    const rowVirtualizer = useVirtualizer({
        count: sortedData.length,
        getScrollElement: () => scrollContainerRef.current,
        estimateSize: () => rowHeight,
        overscan,
        getItemKey: (index) => getRowId(sortedData[index]!),
    });

    const virtualRows = rowVirtualizer.getVirtualItems();

    const topPadding = virtualRows[0]?.start ?? 0;
    const lastVirtualRow = virtualRows[virtualRows.length - 1];
    const bottomPadding = lastVirtualRow
        ? rowVirtualizer.getTotalSize() - lastVirtualRow.end
        : 0;

    function handleSort(column: VirtualizedTableColumn<T>) {
        if (column.sortable === false) {
            return;
        }

        setSort((current) => {
            if (current?.columnId === column.id) {
                return {
                    columnId: column.id,
                    direction: current.direction === "asc" ? "desc" : "asc",
                };
            }

            return {
                columnId: column.id,
                direction: "asc",
            };
        });

        rowVirtualizer.scrollToOffset(0);
    }

    const containerStyle = {
        maxHeight,
    } satisfies CSSProperties;

    return (
        <div
            ref={scrollContainerRef}
            className="flex relative overflow-auto w-full"
            style={containerStyle}
        >
            <table className="w-full min-w-max border-separate border-spacing-0 text-left">
                <thead>
                    <tr>
                        {columns.map((column) => {
                            const active = sort?.columnId === column.id;

                            const ariaSort = !active
                                ? "none"
                                : sort.direction === "asc"
                                  ? "ascending"
                                  : "descending";

                            return (
                                <th
                                    key={column.id}
                                    scope="col"
                                    aria-sort={ariaSort}
                                    style={{
                                        width: column.width,
                                    }}
                                    className={`sticky top-0 ${
                                        column.align === "right"
                                            ? "text-right"
                                            : ""
                                    }`}
                                >
                                    {column.sortable === false ? (
                                        column.header
                                    ) : (
                                        <button
                                            type="button"
                                            className="inline-flex items-center gap-1 p-0 bg-transparent font-semibold cursor-pointer"
                                            style={{ border: "none" }}
                                            onClick={() => handleSort(column)}
                                        >
                                            {column.header}
                                            {active
                                                ? sort.direction === "asc"
                                                    ? " ▲"
                                                    : " ▼"
                                                : ""}
                                        </button>
                                    )}
                                </th>
                            );
                        })}
                    </tr>
                </thead>

                <tbody>
                    {topPadding > 0 && (
                        <tr aria-hidden="true">
                            <td
                                colSpan={columns.length}
                                className="p-0 border-0 leading-0"
                                style={{ height: topPadding }}
                            />
                        </tr>
                    )}

                    {virtualRows.map((virtualRow) => {
                        const row = sortedData[virtualRow.index]!;

                        return (
                            <tr key={getRowId(row)}>
                                {columns.map((column, index) => {
                                    const value = column.accessor(row);

                                    const content = column.cell
                                        ? column.cell(row, value)
                                        : value;

                                    return index === 0 ? (
                                        <td
                                            key={column.id}
                                            scope="row"
                                            className={
                                                column.align === "right"
                                                    ? "text-right"
                                                    : ""
                                            }
                                            style={{
                                                paddingLeft: "0.25rem",
                                                height: rowHeight,
                                            }}
                                        >
                                            {content}
                                        </td>
                                    ) : (
                                        <td
                                            key={column.id}
                                            className={
                                                column.align === "right"
                                                    ? "text-right"
                                                    : ""
                                            }
                                            style={{
                                                paddingRight:
                                                    index === columns.length - 1
                                                        ? "0.25rem"
                                                        : "",
                                            }}
                                        >
                                            {content === undefined ||
                                            value === 0 ||
                                            value === undefined
                                                ? "-"
                                                : content}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}

                    {bottomPadding > 0 && (
                        <tr aria-hidden="true">
                            <td
                                colSpan={columns.length}
                                className="p-0 border-0 leading-0"
                                style={{ height: bottomPadding }}
                            />
                        </tr>
                    )}

                    {sortedData.length === 0 && (
                        <tr>
                            <td
                                colSpan={columns.length}
                                className="h-20 text-center"
                            >
                                {emptyMessage}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
