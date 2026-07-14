import ModifierMap from "@/lib/types/modifer";

type Equippable = {
    Name: string; //pk
    AdditiveModifiers?: ModifierMap;
    MultiplicativeModifiers?: ModifierMap;
    Weight: string;
};

export default Equippable;
