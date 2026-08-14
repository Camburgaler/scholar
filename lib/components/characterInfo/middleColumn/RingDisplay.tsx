import { Rings } from "@/lib/gameData";
import EquippedRings from "@/lib/interfaces/equippedRings";
import {
    useEquippedRings,
    useEquippedRingsDispatch,
} from "@/lib/reducers/equippedRings";

export default function RingDisplay(props: {
    slot: keyof EquippedRings;
    isRightDisplay?: boolean;
}) {
    // Props
    const { slot, isRightDisplay } = props;

    // Context
    const equippedRings = useEquippedRings();
    const setEquippedRings = useEquippedRingsDispatch();

    return (
        <select
            className="col-span-1 flex h-full w-full"
            // defaultValue="No Ring"
            value={equippedRings[slot].Name}
            onChange={(e) => {
                setEquippedRings({
                    slot: slot,
                    ring: Rings.find((ring) => ring.Name === e.target.value)!,
                });
            }}
            style={{ textAlign: isRightDisplay ? "right" : "left" }}
        >
            {Rings.map((ring) => (
                <option key={ring.Name} value={ring.Name}>
                    {ring.Name}
                </option>
            ))}
        </select>
    );
}
