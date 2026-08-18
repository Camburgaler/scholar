import Modifier from "@/lib/interfaces/modifier";

/**
 * @interface Equippable
 * @description An interface representing an equippable item.
 * @member Name - The name of the equippable item.
 * @member Modifiers - The {@link Modifier}s provided by the equippable item.
 * @member Weight - The weight of the equippable item.
 * @member Durability - The durability of the equippable item.
 * @member RepairCost - The repair cost of the equippable item.
 */
interface Equippable {
    Name: string; //pk
    Modifiers: Modifier[];
    Weight: number;
    Durability: number;
    RepairCost: number;
}

export default Equippable;
