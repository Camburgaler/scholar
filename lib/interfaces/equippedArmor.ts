import Armor from "@/lib/interfaces/armor";

/**
 * @interface EquippedArmor
 * @description An interface representing an equipped armor piece.
 * @member data - The armor piece being equipped. {@link Armor}
 * @member reinforcementLevel - The reinforcement level of the armor piece.
 */
interface EquippedArmor {
    data: Armor;
    reinforcementLevel: number;
}

export default EquippedArmor;
