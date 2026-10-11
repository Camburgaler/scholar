import EquippedWeapon from "@/lib/classes/equippedWeapon";
import VirtualizedTable from "@/lib/components/common/VirtualizedTable";
import { VirtualizedTableColumn } from "@/lib/components/common/VirtualizedTable.types";
import WeaponTooltip from "@/lib/components/common/WeaponTooltip";
import Weapon from "@/lib/interfaces/weapon";
import InfusionMap, { InfusionMapKey } from "@/lib/types/infusionMap";

export interface WeaponAttackRow extends InfusionMap<number> {
    max: number;
    weapon: Weapon;
}

function getEquippedWeapon(
    weapon: Weapon,
    infusion: InfusionMapKey,
    reinforcementLevel: number,
): EquippedWeapon {
    let equippedWeapon = EquippedWeapon.fromWeapon(weapon);
    equippedWeapon.infusionKey = infusion;
    equippedWeapon.reinforcementLevel = reinforcementLevel;
    return equippedWeapon;
}

function conditionallyRenderWeaponTooltip(
    row: WeaponAttackRow,
    value: string | number,
    infusion: InfusionMapKey,
    reinforcementLevel: number,
) {
    return row.weapon.Infusions.some((inf) => inf.Name === infusion) ? (
        <WeaponTooltip
            equippedWeapon={getEquippedWeapon(
                row.weapon,
                infusion,
                reinforcementLevel,
            )}
            side="right"
        >
            <p>{value}</p>
        </WeaponTooltip>
    ) : (
        <p>-</p>
    );
}

const columns = [
    {
        id: "weapon",
        header: "Weapon",
        accessor: (row) => row.weapon.Name,
        width: "16rem",
    },
    {
        id: "max",
        header: "Max",
        accessor: (row) => row.max,
        align: "right",
        cell: (_row, value) => <b>{value}</b>,
    },
    {
        id: "physical",
        header: "Physical",
        accessor: (row) => row.Physical!,
        align: "right",
        cell: (row, value) => (
            <WeaponTooltip
                equippedWeapon={getEquippedWeapon(row.weapon, "Physical", 0)}
                side="right"
            >
                <p>{value}</p>
            </WeaponTooltip>
        ),
    },
    {
        id: "magic",
        header: "Magic",
        accessor: (row) => row.Magic!,
        align: "right",
        cell: (row, value) =>
            conditionallyRenderWeaponTooltip(row, value, "Magic", 0),
    },
    {
        id: "fire",
        header: "Fire",
        accessor: (row) => row.Fire!,
        align: "right",
        cell: (row, value) =>
            conditionallyRenderWeaponTooltip(row, value, "Fire", 0),
    },
    {
        id: "lightning",
        header: "Lightning",
        accessor: (row) => row.Lightning!,
        align: "right",
        cell: (row, value) =>
            conditionallyRenderWeaponTooltip(row, value, "Lightning", 0),
    },
    {
        id: "dark",
        header: "Dark",
        accessor: (row) => row.Dark!,
        align: "right",
        cell: (row, value) =>
            conditionallyRenderWeaponTooltip(row, value, "Dark", 0),
    },
    {
        id: "poison",
        header: "Poison",
        accessor: (row) => row.Poison!,
        align: "right",
        cell: (row, value) =>
            conditionallyRenderWeaponTooltip(row, value, "Poison", 0),
    },
    {
        id: "bleed",
        header: "Bleed",
        accessor: (row) => row.Bleed!,
        align: "right",
        cell: (row, value) =>
            conditionallyRenderWeaponTooltip(row, value, "Bleed", 0),
    },
    {
        id: "raw",
        header: "Raw",
        accessor: (row) => row.Raw!,
        align: "right",
        cell: (row, value) =>
            conditionallyRenderWeaponTooltip(row, value, "Raw", 0),
    },
    {
        id: "enchanted",
        header: "Enchanted",
        accessor: (row) => row.Enchanted!,
        align: "right",
        cell: (row, value) =>
            conditionallyRenderWeaponTooltip(row, value, "Enchanted", 0),
    },
    {
        id: "mundane",
        header: "Mundane",
        accessor: (row) => row.Mundane!,
        align: "right",
        cell: (row, value) =>
            conditionallyRenderWeaponTooltip(row, value, "Mundane", 0),
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
            getRowId={(row) => row.weapon.Name}
            initialSort={{
                columnId: "max",
                direction: "desc",
            }}
            emptyMessage="No matching weapons."
        />
    );
}
