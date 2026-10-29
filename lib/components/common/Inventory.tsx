import VirtualizedList from "@/lib/components/common/VirtualizedList";
import {
    SortingConfig,
    useSortingConfigDispatch,
} from "@/lib/reducers/configs/sortingConfig";
import { JSX, ReactNode, useEffect } from "react";
import { ArrowUp, XLg } from "react-bootstrap-icons";

interface InventoryProps<ItemType> {
    title: string;
    allItems: ItemType[];
    inventory: ItemType[];
    setInventory: (action: {
        action: "add" | "remove";
        data: ItemType;
    }) => void;
    defaultItem?: ItemType;
    isDefaultItem?: (item: ItemType) => boolean;
    sortingConfigValue: string;
    renderTooltip?: (item: ItemType, children: ReactNode) => JSX.Element;
    renderItemName: (item: ItemType) => string;
    renderExtraContent?: (
        item: ItemType,
        updateFunc: (item: ItemType) => void,
    ) => ReactNode;
    filterFunc: (item: ItemType, searchStr: string) => boolean;
}

export default function Inventory<ItemType>(props: InventoryProps<ItemType>) {
    const {
        title,
        allItems,
        inventory,
        setInventory,
        defaultItem,
        isDefaultItem = () => false,
        sortingConfigValue,
        renderTooltip = (_, children) => <>{children}</>,
        renderItemName,
        renderExtraContent,
        filterFunc,
    } = props;

    const setSortingConfig = useSortingConfigDispatch();

    useEffect(() => {
        if (defaultItem) {
            setInventory({
                action: "add",
                data: defaultItem,
            });
        }
    }, [defaultItem, setInventory]);

    return (
        <div className="flex flex-col w-full h-full items-center justify-center align-center">
            <h2 className="text-2xl text-right font-bold">{title}</h2>
            <hr />

            <div className="flex flex-col gap-1 w-full h-full items-center align-center">
                {/* Character inventory */}
                <VirtualizedList<ItemType>
                    list={inventory}
                    height={75}
                    searchboxPlaceholder="Search inventory..."
                    renderFunc={(item: ItemType) => {
                        const name = renderItemName(item);
                        return renderTooltip!(
                            item,
                            <div className="w-full flex flex-col items-center">
                                <div className="w-full flex items-center justify-between align-center">
                                    <p className="p-1">{name}</p>
                                    {!isDefaultItem(item) && (
                                        <button
                                            className="p-1"
                                            onClick={() => {
                                                setInventory({
                                                    action: "remove",
                                                    data: item,
                                                });
                                            }}
                                        >
                                            <XLg />
                                        </button>
                                    )}
                                </div>
                                {renderExtraContent && (
                                    <div className="w-full flex items-center justify-baseline align-center">
                                        {renderExtraContent(
                                            item,
                                            (updatedItem) => {
                                                setInventory({
                                                    action: "add",
                                                    data: updatedItem,
                                                });
                                            },
                                        )}
                                    </div>
                                )}
                            </div>,
                        );
                    }}
                    filterFunc={filterFunc}
                />

                {/* All items */}
                <VirtualizedList<ItemType>
                    list={allItems}
                    searchboxPlaceholder={`Search all ${title.toLowerCase()}...`}
                    renderFunc={(item: ItemType) => {
                        const name = renderItemName(item);
                        return renderTooltip!(
                            item,
                            <div className="flex items-center">
                                {!isDefaultItem(item) && (
                                    <button
                                        className="p-1"
                                        onClick={() => {
                                            setInventory({
                                                action: "add",
                                                data: item,
                                            });
                                        }}
                                    >
                                        <ArrowUp />
                                    </button>
                                )}
                                <p className="p-1">{name}</p>
                            </div>,
                        );
                    }}
                    filterFunc={filterFunc}
                />

                <div className="w-full h-full content-end">
                    <button
                        className="border rounded-lg p-1 w-full"
                        onClick={() =>
                            setSortingConfig({
                                value: sortingConfigValue as SortingConfig,
                            })
                        }
                    >
                        Sorting configs...
                    </button>
                </div>
            </div>
        </div>
    );
}
