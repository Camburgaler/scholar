import Modifier from "@/lib/types/modifier";

type Equippable = {
    Name: string; //pk
    Modifiers?: Modifier[];
    Weight: number;
};

export default Equippable;
