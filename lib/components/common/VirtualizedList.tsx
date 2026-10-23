import { useVirtualizer } from "@tanstack/react-virtual";
import { JSX, useMemo, useRef, useState } from "react";

export default function VirtualizedList<T>(props: {
    list: T[];
    height?: number;
    searchboxPlaceholder?: string;
    renderFunc?: (item: T) => JSX.Element;
    filterFunc?: (item: T, searchStr: string) => boolean;
}): JSX.Element {
    // Skipping automatic memoization because Tanstack Virtual is incompatible
    "use no memo";

    // Props
    const { list, height, searchboxPlaceholder, renderFunc, filterFunc } =
        props;

    // State
    const [search, setSearch] = useState<string>("");

    // Memos
    const filteredList = useMemo(() => {
        const searchStr = search.trim().toLowerCase();

        if (!searchStr) {
            return list;
        }

        return list.filter((weapon) => {
            return filterFunc ? filterFunc(weapon, searchStr) : true;
        });
    }, [search, list, filterFunc]);

    // The scrollable elements for your lists
    const parentRef = useRef<HTMLDivElement>(null);

    // The virtualizers
    const listVirtualizer =
        // prettier-ignore
        useVirtualizer({ // eslint-disable-line react-hooks/incompatible-library
            count: filteredList.length,
            getScrollElement: () => parentRef.current,
            estimateSize: () => height || 50,
            overscan: 5,
    });

    return (
        <div className="relative border rounded-lg w-full h-100 flex flex-col">
            {/* Searchbox */}
            <div className="p-1 shrink-0">
                <input
                    className="border rounded-lg p-1 w-full"
                    type="text"
                    placeholder={searchboxPlaceholder || "Search..."}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* List */}

            {renderFunc ? (
                <div className="overflow-auto" ref={parentRef}>
                    <div
                        style={{
                            height: `${listVirtualizer.getTotalSize()}px`,
                            width: "100%",
                            position: "relative",
                        }}
                    >
                        {listVirtualizer
                            .getVirtualItems()
                            .map((virtualItem) => {
                                const item: T = filteredList[virtualItem.index];

                                return (
                                    <div
                                        className="p-1 content-center flex"
                                        key={virtualItem.index}
                                        style={{
                                            position: "absolute",
                                            top: 0,
                                            left: 0,
                                            width: "100%",
                                            minHeight: `${virtualItem.size}px`,
                                            transform: `translateY(${virtualItem.start}px)`,
                                            backgroundColor:
                                                virtualItem.index % 2 === 0
                                                    ? "var(--primary)"
                                                    : "var(--secondary)",
                                        }}
                                    >
                                        {renderFunc(item)}
                                    </div>
                                );
                            })}
                    </div>
                </div>
            ) : (
                <div className="p-1 content-center flex w-full">
                    No render function provided.
                </div>
            )}
        </div>
    );
}
