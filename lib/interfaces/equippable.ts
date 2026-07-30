import Modifier from "@/lib/interfaces/modifier";

interface Equippable {
    Name: string; //pk
    Modifiers?: Modifier[];
    Weight: number;
    Durability: number;
    RepairCost: number;
}

export default Equippable;
