import Equippable from "@/lib/types/equippable";
import StatMap from "@/lib/types/statMap";

interface Multipliers {
    maxHp: number;
    maxFp: number;
    maxStamina: number;
    equipLoad: number;
}

type Ring = Equippable & {
    weight: string;
    stats: StatMap<number>;
    multipliers: Multipliers;
};

export default Ring;
