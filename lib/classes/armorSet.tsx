import ModifierDisplay from "@/lib/components/characterInfo/rightColumn/modifierDisplay";
import { Chestpieces, Gauntlets, Helmets, Leggings } from "@/lib/gameData";
import Armor from "@/lib/interfaces/armor";
import EquippedArmor from "@/lib/interfaces/equippedArmor";
import Modifier from "@/lib/interfaces/modifier";
import { reinforcedValue } from "@/lib/scripts/slopeIntercept";
import { AttributeMapKey } from "@/lib/types/attributeMap";
import { DefenseMapKey } from "@/lib/types/defenseMap";
import { ResistanceMapKey } from "@/lib/types/resistanceMap";
import { JSX } from "react/jsx-runtime";

export type ArmorSetKey = "helmet" | "chestpiece" | "gauntlets" | "leggings";

/**
 * @class ArmorSet
 * @description A class representing an armor set. Provides static methods for creating armor sets. Provides methods for getting and setting armor set data.
 *
 * @member {@link EquippedArmor} helmet - The helmet equipped in the armor set. Initialized to No Armor.
 * @member {@link EquippedArmor} chestpiece - The chestpiece equipped in the armor set. Initialized to No Armor.
 * @member {@link EquippedArmor} gauntlets - The gauntlets equipped in the armor set. Initialized to No Armor.
 * @member {@link EquippedArmor} leggings - The leggings equipped in the armor set. Initialized to No Armor.
 */
class ArmorSet {
    // MEMBERS

    /**
     * @member {@link EquippedArmor} helmet - The helmet equipped in the armor set.
     */
    public helmet: EquippedArmor = {
        data: Helmets[0],
        reinforcementLevel: 0,
    };

    /**
     * @member {@link EquippedArmor} chestpiece - The chestpiece equipped in the armor set.
     */
    public chestpiece: EquippedArmor = {
        data: Chestpieces[0],
        reinforcementLevel: 0,
    };

    /**
     * @member {@link EquippedArmor} gauntlets - The gauntlets equipped in the armor set.
     */
    public gauntlets: EquippedArmor = {
        data: Gauntlets[0],
        reinforcementLevel: 0,
    };

    /**
     * @member {@link EquippedArmor} leggings - The leggings equipped in the armor set.
     */
    public leggings: EquippedArmor = {
        data: Leggings[0],
        reinforcementLevel: 0,
    };

    // STATIC METHODS

    /**
     * @method fromArmorSet
     * @static
     * @description Creates a new armor set from an existing armor set.
     * @param given - The {@link ArmorSet} from which to copy.
     * @returns The new {@link ArmorSet}.
     */
    public static fromArmorSet(given: ArmorSet): ArmorSet {
        const newArmorSet = new ArmorSet();
        newArmorSet.copyFrom(given);
        return newArmorSet;
    }

    /**
     * @method fromEquippedArmor
     * @static
     * @description Creates a new armor set from equipped armors.
     * @param helmet - The helmet equipped in the armor set. {@link EquippedArmor}.
     * @param chestpiece - The chestpiece equipped in the armor set. {@link EquippedArmor}.
     * @param gauntlets - The gauntlets equipped in the armor set. {@link EquippedArmor}.
     * @param leggings - The leggings equipped in the armor set. {@link EquippedArmor}.
     * @returns The new {@link ArmorSet}.
     */
    public static fromEquippedArmor(
        helmet: EquippedArmor,
        chestpiece: EquippedArmor,
        gauntlets: EquippedArmor,
        leggings: EquippedArmor,
    ): ArmorSet {
        const newArmorSet = new ArmorSet();
        newArmorSet.helmet = helmet;
        newArmorSet.chestpiece = chestpiece;
        newArmorSet.gauntlets = gauntlets;
        newArmorSet.leggings = leggings;
        return newArmorSet;
    }

    /**
     * @method fromArmor
     * @static
     * @description Creates a new armor set from armor data.
     * @param helmet - The helmet data in the armor set. {@link Armor}.
     * @param chestpiece - The chestpiece data in the armor set. {@link Armor}.
     * @param gauntlets - The gauntlets data in the armor set. {@link Armor}.
     * @param leggings - The leggings data in the armor set. {@link Armor}.
     * @returns The new armor set. {@link ArmorSet}.
     */
    public static fromArmor(
        helmet: Armor,
        chestpiece: Armor,
        gauntlets: Armor,
        leggings: Armor,
    ): ArmorSet {
        const newArmorSet = new ArmorSet();
        newArmorSet.helmet.data = helmet;
        newArmorSet.chestpiece.data = chestpiece;
        newArmorSet.gauntlets.data = gauntlets;
        newArmorSet.leggings.data = leggings;
        return newArmorSet;
    }

    // GETTERS & SETTERS

    /**
     * @method getArmor
     * @description Gets the armor set data for a given field.
     * @param slot The field to get the data for. Key of {@link ArmorSet}.
     * @returns The {@link EquippedArmor} data for the given field.
     */
    public getArmor(slot: ArmorSetKey): EquippedArmor {
        if (this[slot] === undefined || this[slot] === null) {
            // panic out
            throw new Error(`ArmorSet slot ${slot} is undefined`);
        }

        if (typeof this[slot] !== "object") {
            // panic out
            throw new Error(`ArmorSet slot ${slot} is not an object`);
        }

        return this[slot];
    }

    /**
     * @method setArmor
     * @description Sets the armor set data for a given field.
     * @param field The field to set the data for. Must refer to a member and not a method. Key of {@link ArmorSet}.
     * @param value The {@link EquippedArmor} to which the field should be set.
     */
    public setArmor(field: keyof ArmorSet, value: EquippedArmor) {
        if (typeof this[field] !== "object") {
            // panic out
            throw new Error(`ArmorSet field ${field} is not a member`);
        }

        (this as any)[field] = value;
    }

    /**
     * @method copyFrom
     * @description Copies the armor set from another armor set.
     * @param armorSet The {@link ArmorSet} from which to copy.
     */
    public copyFrom(armorSet: ArmorSet) {
        this.helmet = armorSet.helmet;
        this.chestpiece = armorSet.chestpiece;
        this.gauntlets = armorSet.gauntlets;
        this.leggings = armorSet.leggings;
    }

    // PUBLIC METHODS

    /**
     * @method weight
     * @description Gets the total weight of the armor set.
     * @returns The total weight of the armor set.
     */
    public get weight(): number {
        return (
            this.helmet.data.Weight +
            this.chestpiece.data.Weight +
            this.gauntlets.data.Weight +
            this.leggings.data.Weight
        );
    }

    /**
     * @description Sums the defense values of an armor set for a given defense field.
     * @param defenseField The defense field to sum the values for. {@link DefenseMapKey}.
     * @returns The sum of the defense values for the given field.
     */
    public defense(defenseField: DefenseMapKey): number {
        const helmetDefense = this.helmet.data.Defenses[defenseField];
        const helmetReinforcementLevel = this.helmet.reinforcementLevel;
        const chestpieceDefense = this.chestpiece.data.Defenses[defenseField];
        const chestpieceReinforcementLevel = this.chestpiece.reinforcementLevel;
        const gauntletsDefense = this.gauntlets.data.Defenses[defenseField];
        const gauntletsReinforcementLevel = this.gauntlets.reinforcementLevel;
        const leggingsDefense = this.leggings.data.Defenses[defenseField];
        const leggingsReinforcementLevel = this.leggings.reinforcementLevel;

        return (
            reinforcedValue(helmetDefense, helmetReinforcementLevel) +
            reinforcedValue(chestpieceDefense, chestpieceReinforcementLevel) +
            reinforcedValue(gauntletsDefense, gauntletsReinforcementLevel) +
            reinforcedValue(leggingsDefense, leggingsReinforcementLevel)
        );
    }

    /**
     * @description Sums the resistance values of an armor set for a given resistance field.
     * @param resistanceField The resistance field to sum the values for. {@link ResistanceMapKey}.
     * @returns The sum of the resistance values for the given field.
     */
    public resistance(resistanceField: ResistanceMapKey): number {
        const helmetResistance = this.helmet.data.Resistances[resistanceField];
        const helmetReinforcementLevel = this.helmet.reinforcementLevel;
        const chestpieceResistance =
            this.chestpiece.data.Resistances[resistanceField];
        const chestpieceReinforcementLevel = this.chestpiece.reinforcementLevel;
        const gauntletsResistance =
            this.gauntlets.data.Resistances[resistanceField];
        const gauntletsReinforcementLevel = this.gauntlets.reinforcementLevel;
        const leggingsResistance =
            this.leggings.data.Resistances[resistanceField];
        const leggingsReinforcementLevel = this.leggings.reinforcementLevel;

        return (
            reinforcedValue(helmetResistance, helmetReinforcementLevel) +
            reinforcedValue(
                chestpieceResistance,
                chestpieceReinforcementLevel,
            ) +
            reinforcedValue(gauntletsResistance, gauntletsReinforcementLevel) +
            reinforcedValue(leggingsResistance, leggingsReinforcementLevel)
        );
    }

    /**
     * @method poise
     * @description Gets the total poise of the armor set.
     * @returns {number} The total poise of the armor set.
     */
    public poise(): number {
        return (
            this.helmet.data.Poise +
            this.chestpiece.data.Poise +
            this.gauntlets.data.Poise +
            this.leggings.data.Poise
        );
    }

    /**
     * @method itemDiscovery
     * @description Gets the total item discovery of the armor set.
     * @returns {number} The total item discovery of the armor set.
     */
    public itemDiscovery(): number {
        return (
            this.helmet.data.ItemDiscovery +
            this.chestpiece.data.ItemDiscovery +
            this.gauntlets.data.ItemDiscovery +
            this.leggings.data.ItemDiscovery
        );
    }

    /**
     * @method getModifierDisplays
     * @description Gets the ModifierDisplay components for the armor set.
     * @returns The {@link ModifierDisplay}s for the armor set.
     */
    public getModifierDisplays(): JSX.Element[] {
        let activeEffects: JSX.Element[] = [];
        let isOddRow = true;

        this.helmet.data.Modifiers.forEach((modifier) => {
            activeEffects.push(
                <ModifierDisplay
                    description={modifier.Description}
                    equipmentName={this.helmet.data.Name}
                    isOddRow={isOddRow}
                />,
            );
            isOddRow = !isOddRow;
        });

        if (this.helmet.data.ItemDiscovery > 0) {
            activeEffects.push(
                <ModifierDisplay
                    description={`Increase Item Discovery by ${this.helmet.data.ItemDiscovery}`}
                    equipmentName={this.helmet.data.Name}
                    isOddRow={isOddRow}
                />,
            );
            isOddRow = !isOddRow;
        }

        this.chestpiece.data.Modifiers.forEach((modifier) => {
            activeEffects.push(
                <ModifierDisplay
                    description={modifier.Description}
                    equipmentName={this.chestpiece.data.Name}
                    isOddRow={isOddRow}
                />,
            );
            isOddRow = !isOddRow;
        });

        if (this.chestpiece.data.ItemDiscovery > 0) {
            activeEffects.push(
                <ModifierDisplay
                    description={`Increase Item Discovery by ${this.chestpiece.data.ItemDiscovery}`}
                    equipmentName={this.chestpiece.data.Name}
                    isOddRow={isOddRow}
                />,
            );
            isOddRow = !isOddRow;
        }

        this.gauntlets.data.Modifiers.forEach((modifier) => {
            activeEffects.push(
                <ModifierDisplay
                    description={modifier.Description}
                    equipmentName={this.gauntlets.data.Name}
                    isOddRow={isOddRow}
                />,
            );
            isOddRow = !isOddRow;
        });

        if (this.gauntlets.data.ItemDiscovery > 0) {
            activeEffects.push(
                <ModifierDisplay
                    description={`Increase Item Discovery by ${this.gauntlets.data.ItemDiscovery}`}
                    equipmentName={this.gauntlets.data.Name}
                    isOddRow={isOddRow}
                />,
            );
            isOddRow = !isOddRow;
        }

        this.leggings.data.Modifiers.forEach((modifier) => {
            activeEffects.push(
                <ModifierDisplay
                    description={modifier.Description}
                    equipmentName={this.leggings.data.Name}
                    isOddRow={isOddRow}
                />,
            );
            isOddRow = !isOddRow;
        });

        if (this.leggings.data.ItemDiscovery > 0) {
            activeEffects.push(
                <ModifierDisplay
                    description={`Increase Item Discovery by ${this.leggings.data.ItemDiscovery}`}
                    equipmentName={this.leggings.data.Name}
                    isOddRow={isOddRow}
                />,
            );
            isOddRow = !isOddRow;
        }

        return activeEffects;
    }

    /**
     * @method activeEffects
     * @description Gets the active effects of the armor set.
     * @returns The active effects of the armor set. Array of {@link Modifier}s.
     */
    public activeEffects(): Modifier[] {
        let activeEffects: Modifier[] = [];

        this.helmet.data.Modifiers.forEach((modifier) => {
            activeEffects.push(modifier);
        });

        this.chestpiece.data.Modifiers.forEach((modifier) => {
            activeEffects.push(modifier);
        });

        this.gauntlets.data.Modifiers.forEach((modifier) => {
            activeEffects.push(modifier);
        });

        this.leggings.data.Modifiers.forEach((modifier) => {
            activeEffects.push(modifier);
        });

        return activeEffects;
    }

    /**
     * @method attributeModifier
     * @description Gets the total attribute modifier of the armor set for a given attribute.
     * @param attribute The attribute to get the modifier for. {@link AttributeMapKey}.
     * @returns {number} The total attribute modifier of the armor set for the given attribute.
     */
    public attributeModifier(attribute: AttributeMapKey): number {
        let modifierSum = 0;

        this.activeEffects()
            .filter(
                (modifier) =>
                    modifier.TargetType === "attribute" &&
                    modifier.Target === attribute,
            )
            .forEach((modifier) => {
                modifierSum += modifier.Value;
            });

        return modifierSum;
    }

    /**
     * @method thrustDefense
     * @description Gets the total thrust defense of the armor set.
     * @param physicalDefense The physical defense of the character.
     * @returns {number} The total thrust defense of the armor set.
     */
    public thrustDefense(physicalDefense: number): number {
        const helmet = this.helmet.data;
        const chestpiece = this.chestpiece.data;
        const gauntlets = this.gauntlets.data;
        const leggings = this.leggings.data;

        const reinforcedThrustHelmet = reinforcedValue(
            helmet.Defenses.Thrust,
            this.helmet.reinforcementLevel,
        );
        const reinforcedThrustChestpiece = reinforcedValue(
            chestpiece.Defenses.Thrust,
            this.chestpiece.reinforcementLevel,
        );
        const reinforcedThrustGauntlets = reinforcedValue(
            gauntlets.Defenses.Thrust,
            this.gauntlets.reinforcementLevel,
        );
        const reinforcedThrustLeggings = reinforcedValue(
            leggings.Defenses.Thrust,
            this.leggings.reinforcementLevel,
        );

        return (
            reinforcedThrustHelmet +
            physicalDefense * helmet.DefenseScalingPhysical +
            reinforcedThrustChestpiece +
            physicalDefense * chestpiece.DefenseScalingPhysical +
            reinforcedThrustGauntlets +
            physicalDefense * gauntlets.DefenseScalingPhysical +
            reinforcedThrustLeggings +
            physicalDefense * leggings.DefenseScalingPhysical
        );
    }

    /**
     * @method slashDefense
     * @description Gets the total slash defense of the armor set.
     * @param physicalDefense The physical defense of the character.
     * @returns {number} The total slash defense of the armor set.
     */
    public slashDefense(physicalDefense: number): number {
        const helmet = this.helmet.data;
        const chestpiece = this.chestpiece.data;
        const gauntlets = this.gauntlets.data;
        const leggings = this.leggings.data;

        const reinforcedSlashHelmet = reinforcedValue(
            helmet.Defenses.Slash,
            this.helmet.reinforcementLevel,
        );
        const reinforcedSlashChestpiece = reinforcedValue(
            chestpiece.Defenses.Slash,
            this.chestpiece.reinforcementLevel,
        );
        const reinforcedSlashGauntlets = reinforcedValue(
            gauntlets.Defenses.Slash,
            this.gauntlets.reinforcementLevel,
        );
        const reinforcedSlashLeggings = reinforcedValue(
            leggings.Defenses.Slash,
            this.leggings.reinforcementLevel,
        );

        return (
            reinforcedSlashHelmet +
            physicalDefense * helmet.DefenseScalingPhysical +
            reinforcedSlashChestpiece +
            physicalDefense * chestpiece.DefenseScalingPhysical +
            reinforcedSlashGauntlets +
            physicalDefense * gauntlets.DefenseScalingPhysical +
            reinforcedSlashLeggings +
            physicalDefense * leggings.DefenseScalingPhysical
        );
    }

    /**
     * @method strikeDefense
     * @description Gets the total strike defense of the armor set.
     * @param physicalDefense The physical defense of the character.
     * @returns {number} The total strike defense of the armor set.
     */
    public strikeDefense(physicalDefense: number): number {
        const helmet = this.helmet.data;
        const chestpiece = this.chestpiece.data;
        const gauntlets = this.gauntlets.data;
        const leggings = this.leggings.data;

        const reinforcedStrikeHelmet = reinforcedValue(
            helmet.Defenses.Strike,
            this.helmet.reinforcementLevel,
        );
        const reinforcedStrikeChestpiece = reinforcedValue(
            chestpiece.Defenses.Strike,
            this.chestpiece.reinforcementLevel,
        );
        const reinforcedStrikeGauntlets = reinforcedValue(
            gauntlets.Defenses.Strike,
            this.gauntlets.reinforcementLevel,
        );
        const reinforcedStrikeLeggings = reinforcedValue(
            leggings.Defenses.Strike,
            this.leggings.reinforcementLevel,
        );

        return (
            reinforcedStrikeHelmet +
            physicalDefense * helmet.DefenseScalingPhysical +
            reinforcedStrikeChestpiece +
            physicalDefense * chestpiece.DefenseScalingPhysical +
            reinforcedStrikeGauntlets +
            physicalDefense * gauntlets.DefenseScalingPhysical +
            reinforcedStrikeLeggings +
            physicalDefense * leggings.DefenseScalingPhysical
        );
    }

    public fitness(): number {
        // TODO: Implement fitness calculation
        return 0;
    }
}

export default ArmorSet;
