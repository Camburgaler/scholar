import Ring from "@/lib/interfaces/ring";

/**
 * @interface EquippedRings
 * @description An interface representing the equipped rings of a character.
 * @member 0 - The first equipped ring. {@link Ring}
 * @member 1 - The second equipped ring. {@link Ring}
 * @member 2 - The third equipped ring. {@link Ring}
 * @member 3 - The fourth equipped ring. {@link Ring}
 */
export default interface EquippedRings {
    0: Ring;
    1: Ring;
    2: Ring;
    3: Ring;
}
