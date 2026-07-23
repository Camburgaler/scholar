import ModifierMap from "@/lib/types/modifer";

type Equippable = {
    Name: string; //pk
    AdditiveModifiers?: ModifierMap;
    MultiplicativeModifiers?: ModifierMap;
    Weight: number;
};

export default Equippable;
