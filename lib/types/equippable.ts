import ModifierMap from "@/lib/types/modifer";

type Equippable = {
    Name: string; //pk
    AdditiveModifiers?: ModifierMap | null;
    MultiplicativeModifiers?: ModifierMap | null;
    Weight: number;
};

export default Equippable;
