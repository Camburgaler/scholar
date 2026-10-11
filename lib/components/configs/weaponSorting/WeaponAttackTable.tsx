import VirtualizedTable from "@/lib/components/common/VirtualizedTable";
import { VirtualizedTableColumn } from "@/lib/components/common/VirtualizedTable.types";
import InfusionMap from "@/lib/types/infusionMap";

export interface WeaponAttackRow extends InfusionMap<number> {
    name: string;
    max: number;
}

const columns = [
    {
        id: "weapon",
        header: "Weapon",
        accessor: (row) => row.name,
        width: "16rem",
    },
    {
        id: "max",
        header: "Max",
        accessor: (row) => row.max,
        align: "right",
    },
    {
        id: "physical",
        header: "Physical",
        accessor: (row) => row.Physical!,
        align: "right",
    },
    {
        id: "magic",
        header: "Magic",
        accessor: (row) => row.Magic!,
        align: "right",
    },
    {
        id: "fire",
        header: "Fire",
        accessor: (row) => row.Fire!,
        align: "right",
    },
    {
        id: "lightning",
        header: "Lightning",
        accessor: (row) => row.Lightning!,
        align: "right",
    },
    {
        id: "dark",
        header: "Dark",
        accessor: (row) => row.Dark!,
        align: "right",
    },
    {
        id: "poison",
        header: "Poison",
        accessor: (row) => row.Poison!,
        align: "right",
    },
    {
        id: "bleed",
        header: "Bleed",
        accessor: (row) => row.Bleed!,
        align: "right",
    },
    {
        id: "raw",
        header: "Raw",
        accessor: (row) => row.Raw!,
        align: "right",
    },
    {
        id: "enchanted",
        header: "Enchanted",
        accessor: (row) => row.Enchanted!,
        align: "right",
    },
    {
        id: "mundane",
        header: "Mundane",
        accessor: (row) => row.Mundane!,
        align: "right",
    },
] satisfies VirtualizedTableColumn<WeaponAttackRow>[];

interface WeaponAttackTableProps {
    rows: WeaponAttackRow[];
}

export default function WeaponAttackTable({ rows }: WeaponAttackTableProps) {
    return (
        <VirtualizedTable
            data={rows}
            columns={columns}
            getRowId={(row) => row.name}
            initialSort={{
                columnId: "max",
                direction: "desc",
            }}
            emptyMessage="No matching weapons."
        />
    );
}
