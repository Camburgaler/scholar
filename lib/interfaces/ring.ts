import Equippable from "@/lib/interfaces/equippable";

/**
 * @interface Ring
 * @description An interface representing a ring.
 * @extends {Equippable}
 * @member ItemDiscovery - The amount of item discovery provided by the ring.
 */
interface Ring extends Equippable {
    ItemDiscovery: number;
}

export default Ring;
