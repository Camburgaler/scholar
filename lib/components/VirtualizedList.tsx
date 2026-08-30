import { useVirtualizer } from "@tanstack/react-virtual";
import { JSX, useMemo, useRef, useState } from "react";

export default function VirtualizedList(props: {
    list: any[];
    searchboxPlaceholder?: string;
    renderFunc?: (item: any, index: number) => JSX.Element;
    filterFunc?: (item: any, searchStr: string) => boolean;
}): JSX.Element {
    // Props
    const { list, searchboxPlaceholder, renderFunc, filterFunc } = props;

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
    }, [search, list]);

    // The scrollable elements for your lists
    const parentRef = useRef<HTMLDivElement>(null);

    // The virtualizers
    const listVirtualizer = useVirtualizer({
        count: filteredList.length,
        getScrollElement: () => parentRef.current,
        estimateSize: () => 32,
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
            <div className="overflow-auto" ref={parentRef}>
                <div
                    style={{
                        height: `${listVirtualizer.getTotalSize()}px`,
                        width: "100%",
                        position: "relative",
                    }}
                >
                    {listVirtualizer.getVirtualItems().map((virtualItem) => {
                        const item: any = filteredList[virtualItem.index];

                        return (
                            <div
                                key={virtualItem.index}
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    width: "100%",
                                    height: `${virtualItem.size}px`,
                                    transform: `translateY(${virtualItem.start}px)`,
                                }}
                            >
                                {renderFunc ? (
                                    renderFunc(item, virtualItem.index)
                                ) : (
                                    <div key={virtualItem.index}>{item}</div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
