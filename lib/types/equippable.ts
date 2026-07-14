import ModifierMap from "@/lib/types/modifers";

type Equippable = {
    ID: string;
    Name: string;
    AdditiveModifiers?: ModifierMap;
    MultiplicativeModifiers?: ModifierMap;
};

export default Equippable;
