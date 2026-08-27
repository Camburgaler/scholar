import EquippedWeapon from "@/lib/interfaces/equippedWeapon";
import { Tooltip } from "radix-ui";
import { JSX } from "react/jsx-runtime";

export default function WeaponTooltip(props: {
    children: JSX.Element;
    equippedWeapon: EquippedWeapon;
}): JSX.Element {
    // Props
    const { children, equippedWeapon } = props;

    return (
        <Tooltip.Provider>
            <Tooltip.Root delayDuration={100}>
                <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>

                <Tooltip.Portal>
                    <Tooltip.Content>
                        <div
                            className="flex flex-col border shadow-md rounded-md p-2"
                            style={{
                                backgroundColor: "var(--primary)",
                                color: "var(--secondary)",
                                borderColor: "var(--accent)",
                            }}
                        >
                            <p>
                                {equippedWeapon.infusion != "Basic"
                                    ? equippedWeapon.infusion + " "
                                    : ""}
                                {equippedWeapon.data.Name}
                                {equippedWeapon.reinforcementLevel != 0
                                    ? " +" + equippedWeapon.reinforcementLevel
                                    : ""}
                            </p>
                            <hr />
                            <p>Attack Power</p>
                            <table className="w-full text-left p-1 rounded-lg">
                                <thead>
                                    <tr>
                                        <td>Type</td>
                                        <td>Base</td>
                                        <td>Scaling</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Physical</td>
                                        <td>10</td>
                                        <td>10</td>
                                    </tr>
                                    <tr>
                                        <td>Magic</td>
                                        <td>0</td>
                                        <td>0</td>
                                    </tr>
                                    <tr>
                                        <td>Fire</td>
                                        <td>0</td>
                                        <td>0</td>
                                    </tr>
                                    <tr>
                                        <td>Lightning</td>
                                        <td>0</td>
                                        <td>0</td>
                                    </tr>
                                    <tr>
                                        <td>Dark</td>
                                        <td>0</td>
                                        <td>0</td>
                                    </tr>
                                    <tr>
                                        <td>Poison</td>
                                        <td>0</td>
                                        <td>0</td>
                                    </tr>
                                    <tr>
                                        <td>Bleed</td>
                                        <td>0</td>
                                        <td>0</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </Tooltip.Content>
                </Tooltip.Portal>
            </Tooltip.Root>
        </Tooltip.Provider>
    );
}
