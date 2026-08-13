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

/**
 * @class ArmorSet
 * @description A class representing an armor set. Provides static methods for creating armor sets. Provides methods for getting and setting armor set data.
 *
 * @member {EquippedArmor} helmet - The helmet equipped in the armor set. Initialized to No Armor.
 * @member {EquippedArmor} chestpiece - The chestpiece equipped in the armor set. Initialized to No Armor.
 * @member {EquippedArmor} gauntlets - The gauntlets equipped in the armor set. Initialized to No Armor.
 * @member {EquippedArmor} leggings - The leggings equipped in the armor set. Initialized to No Armor.
 */
class ArmorSet {
    // MEMBERS

    private helmet: EquippedArmor = {
        data: Helmets[0],
        reinforcementLevel: 0,
    };
    private chestpiece: EquippedArmor = {
        data: Chestpieces[0],
        reinforcementLevel: 0,
    };
    private gauntlets: EquippedArmor = {
        data: Gauntlets[0],
        reinforcementLevel: 0,
    };
    private leggings: EquippedArmor = {
        data: Leggings[0],
        reinforcementLevel: 0,
    };

    // STATIC METHODS

    /**
     * @method fromArmorSet
     * @static
     * @description Creates a new armor set from an existing armor set.
     * @param {ArmorSet} given - The armor set to copy from.
     * @returns {ArmorSet} The new armor set.
     */
    public static fromArmorSet(given: ArmorSet): ArmorSet {
        const newArmorSet = new ArmorSet();
        newArmorSet.setHelmet(given.getHelmet());
        newArmorSet.setChestpiece(given.getChestpiece());
        newArmorSet.setGauntlets(given.getGauntlets());
        newArmorSet.setLeggings(given.getLeggings());
        return newArmorSet;
    }

    /**
     * @method fromEquippedArmor
     * @static
     * @description Creates a new armor set from equipped armors.
     * @param {EquippedArmor} helmet - The helmet equipped in the armor set.
     * @param {EquippedArmor} chestpiece - The chestpiece equipped in the armor set.
     * @param {EquippedArmor} gauntlets - The gauntlets equipped in the armor set.
     * @param {EquippedArmor} leggings - The leggings equipped in the armor set.
     * @returns {ArmorSet} The new armor set.
     */
    public static fromEquippedArmor(
        helmet: EquippedArmor,
        chestpiece: EquippedArmor,
        gauntlets: EquippedArmor,
        leggings: EquippedArmor,
    ): ArmorSet {
        const newArmorSet = new ArmorSet();
        newArmorSet.setHelmet(helmet);
        newArmorSet.setChestpiece(chestpiece);
        newArmorSet.setGauntlets(gauntlets);
        newArmorSet.setLeggings(leggings);
        return newArmorSet;
    }

    /**
     * @method fromArmor
     * @static
     * @description Creates a new armor set from armor data.
     * @param {Armor} helmet - The helmet data in the armor set.
     * @param {Armor} chestpiece - The chestpiece data in the armor set.
     * @param {Armor} gauntlets - The gauntlets data in the armor set.
     * @param {Armor} leggings - The leggings data in the armor set.
     * @returns {ArmorSet} The new armor set.
     */
    public static fromArmor(
        helmet: Armor,
        chestpiece: Armor,
        gauntlets: Armor,
        leggings: Armor,
    ): ArmorSet {
        const newArmorSet = new ArmorSet();
        newArmorSet.setHelmetData(helmet);
        newArmorSet.setChestpieceData(chestpiece);
        newArmorSet.setGauntletsData(gauntlets);
        newArmorSet.setLeggingsData(leggings);
        return newArmorSet;
    }

    // GETTERS & SETTERS

    /**
     * @method getField
     * @description Gets the armor set data for a given field.
     * @param slot The field to get the data for.
     * @returns The armor set data for the given field.
     */
    public getArmor(slot: keyof ArmorSet): EquippedArmor {
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
     * @method setField
     * @description Sets the armor set data for a given field.
     * @param field The field to set the data for. Must refer to a member and not a method.
     * @param value The value to set the field to. Must be an EquippedArmor object.
     */
    public setField(field: keyof ArmorSet, value: any) {
        if (typeof this[field] !== "object") {
            // panic out
            throw new Error(`ArmorSet field ${field} is not a member`);
        }

        if (
            typeof value !== "object" ||
            value.data === undefined ||
            value.reinforcementLevel === undefined
        ) {
            // panic out
            throw new Error(
                `ArmorSet field ${field} must be an EquippedArmor object`,
            );
        }

        this[field] = value;
    }

    /**
     * @method copyFrom
     * @description Copies the armor set from another armor set.
     * @param armorSet The armor set to copy from.
     */
    public copyFrom(armorSet: ArmorSet) {
        this.setHelmet(armorSet.getHelmet());
        this.setChestpiece(armorSet.getChestpiece());
        this.setGauntlets(armorSet.getGauntlets());
        this.setLeggings(armorSet.getLeggings());
    }

    /**
     * @method getHelmet
     * @description Gets the helmet equipped in the armor set.
     * @returns {EquippedArmor} The helmet equipped in the armor set.
     */
    public getHelmet(): EquippedArmor {
        return this.helmet;
    }

    /**
     * @method setHelmetData
     * @description Sets the helmet data in the armor set.
     * @param helmet - The helmet data to set.
     */
    public setHelmetData(helmet: Armor): void {
        this.helmet.data = helmet;
    }

    /**
     * @method setHelmetReinforcementLevel
     * @description Sets the reinforcement level of the helmet in the armor set.
     * @param level - The reinforcement level to set.
     */
    public setHelmetReinforcementLevel(level: number): void {
        this.helmet.reinforcementLevel = level;
    }

    /**
     * @method setHelmet
     * @description Sets the helmet in the armor set.
     * @param helmet - The helmet to set.
     */
    public setHelmet(helmet: EquippedArmor): void {
        this.setHelmetData(helmet.data);
        this.setHelmetReinforcementLevel(helmet.reinforcementLevel);
    }

    /**
     * @method getChestpiece
     * @description Gets the chestpiece equipped in the armor set.
     * @returns {EquippedArmor} The chestpiece equipped in the armor set.
     */
    public getChestpiece(): EquippedArmor {
        return this.chestpiece;
    }

    /**
     * @method setChestpieceData
     * @description Sets the chestpiece data in the armor set.
     * @param chestpiece - The chestpiece data to set.
     */
    public setChestpieceData(chestpiece: Armor): void {
        this.chestpiece.data = chestpiece;
    }

    /**
     * @method setChestpieceReinforcementLevel
     * @description Sets the reinforcement level of the chestpiece in the armor set.
     * @param level - The reinforcement level to set.
     */
    public setChestpieceReinforcementLevel(level: number): void {
        this.chestpiece.reinforcementLevel = level;
    }

    /**
     * @method setChestpiece
     * @description Sets the chestpiece in the armor set.
     * @param chestpiece - The chestpiece to set.
     */
    public setChestpiece(chestpiece: EquippedArmor): void {
        this.setChestpieceData(chestpiece.data);
        this.setChestpieceReinforcementLevel(chestpiece.reinforcementLevel);
    }

    /**
     * @method getGauntlets
     * @description Gets the gauntlets equipped in the armor set.
     * @returns {EquippedArmor} The gauntlets equipped in the armor set.
     */
    public getGauntlets(): EquippedArmor {
        return this.gauntlets;
    }

    /**
     * @method setGauntletsData
     * @description Sets the gauntlets data in the armor set.
     * @param gauntlets - The gauntlets data to set.
     */
    public setGauntletsData(gauntlets: Armor): void {
        this.gauntlets.data = gauntlets;
    }

    /**
     * @method setGauntletsReinforcementLevel
     * @description Sets the reinforcement level of the gauntlets in the armor set.
     * @param level - The reinforcement level to set.
     */
    public setGauntletsReinforcementLevel(level: number): void {
        this.gauntlets.reinforcementLevel = level;
    }

    /**
     * @method setGauntlets
     * @description Sets the gauntlets in the armor set.
     * @param gauntlets - The gauntlets to set.
     */
    public setGauntlets(gauntlets: EquippedArmor): void {
        this.setGauntletsData(gauntlets.data);
        this.setGauntletsReinforcementLevel(gauntlets.reinforcementLevel);
    }

    /**
     * @method getLeggings
     * @description Gets the leggings equipped in the armor set.
     * @returns {EquippedArmor} The leggings equipped in the armor set.
     */
    public getLeggings(): EquippedArmor {
        return this.leggings;
    }

    /**
     * @method setLeggingsData
     * @description Sets the leggings data in the armor set.
     * @param leggings - The leggings data to set.
     */
    public setLeggingsData(leggings: Armor): void {
        this.leggings.data = leggings;
    }

    /**
     * @method setLeggingsReinforcementLevel
     * @description Sets the reinforcement level of the leggings in the armor set.
     * @param level - The reinforcement level to set.
     */
    public setLeggingsReinforcementLevel(level: number): void {
        this.leggings.reinforcementLevel = level;
    }

    /**
     * @method setLeggings
     * @description Sets the leggings in the armor set.
     * @param leggings - The leggings to set.
     */
    public setLeggings(leggings: EquippedArmor): void {
        this.setLeggingsData(leggings.data);
        this.setLeggingsReinforcementLevel(leggings.reinforcementLevel);
    }

    // PUBLIC METHODS

    /**
     * @method weight
     * @description Gets the total weight of the armor set.
     * @returns {number} The total weight of the armor set.
     */
    public weight(): number {
        return (
            this.helmet.data.Weight +
            this.chestpiece.data.Weight +
            this.gauntlets.data.Weight +
            this.leggings.data.Weight
        );
    }

    /**
     * @description Sums the defense values of an armor set for a given defense field.
     * @param defenseField The defense field to sum the values for.
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
     * @param resistanceField The resistance field to sum the values for.
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
     * @returns {ModifierDisplay[]} The modifier displays for the armor set.
     */
    public getModifierDisplays(): JSX.Element[] {
        let activeEffects: JSX.Element[] = [];
        let isOddRow = true;

        this.getHelmet().data.Modifiers.forEach((modifier) => {
            activeEffects.push(
                <ModifierDisplay
                    description={modifier.Description}
                    armorName={this.getHelmet().data.Name}
                    isOddRow={isOddRow}
                />,
            );
            isOddRow = !isOddRow;
        });

        this.getChestpiece().data.Modifiers.forEach((modifier) => {
            activeEffects.push(
                <ModifierDisplay
                    description={modifier.Description}
                    armorName={this.getChestpiece().data.Name}
                    isOddRow={isOddRow}
                />,
            );
            isOddRow = !isOddRow;
        });

        this.getGauntlets().data.Modifiers.forEach((modifier) => {
            activeEffects.push(
                <ModifierDisplay
                    description={modifier.Description}
                    armorName={this.getGauntlets().data.Name}
                    isOddRow={isOddRow}
                />,
            );
            isOddRow = !isOddRow;
        });

        this.getLeggings().data.Modifiers.forEach((modifier) => {
            activeEffects.push(
                <ModifierDisplay
                    description={modifier.Description}
                    armorName={this.getLeggings().data.Name}
                    isOddRow={isOddRow}
                />,
            );
            isOddRow = !isOddRow;
        });

        return activeEffects;
    }

    /**
     * @method activeEffects
     * @description Gets the active effects of the armor set.
     * @returns {Modifier[]} The active effects of the armor set.
     */
    public activeEffects(): Modifier[] {
        let activeEffects: Modifier[] = [];

        this.getHelmet().data.Modifiers.forEach((modifier) => {
            activeEffects.push(modifier);
        });

        this.getChestpiece().data.Modifiers.forEach((modifier) => {
            activeEffects.push(modifier);
        });

        this.getGauntlets().data.Modifiers.forEach((modifier) => {
            activeEffects.push(modifier);
        });

        this.getLeggings().data.Modifiers.forEach((modifier) => {
            activeEffects.push(modifier);
        });

        return activeEffects;
    }

    /**
     * @method attributeModifier
     * @description Gets the total attribute modifier of the armor set for a given attribute.
     * @param attribute The attribute to get the modifier for.
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

    public thrustDefense(physicalDefense: number): number {
        const helmet = this.getHelmet().data;
        const chestpiece = this.getChestpiece().data;
        const gauntlets = this.getGauntlets().data;
        const leggings = this.getLeggings().data;

        const reinforcedThrustHelmet = reinforcedValue(
            helmet.Defenses.Thrust,
            this.getHelmet().reinforcementLevel,
        );
        const reinforcedThrustChestpiece = reinforcedValue(
            chestpiece.Defenses.Thrust,
            this.getChestpiece().reinforcementLevel,
        );
        const reinforcedThrustGauntlets = reinforcedValue(
            gauntlets.Defenses.Thrust,
            this.getGauntlets().reinforcementLevel,
        );
        const reinforcedThrustLeggings = reinforcedValue(
            leggings.Defenses.Thrust,
            this.getLeggings().reinforcementLevel,
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

    public slashDefense(physicalDefense: number): number {
        const helmet = this.getHelmet().data;
        const chestpiece = this.getChestpiece().data;
        const gauntlets = this.getGauntlets().data;
        const leggings = this.getLeggings().data;

        const reinforcedSlashHelmet = reinforcedValue(
            helmet.Defenses.Slash,
            this.getHelmet().reinforcementLevel,
        );
        const reinforcedSlashChestpiece = reinforcedValue(
            chestpiece.Defenses.Slash,
            this.getChestpiece().reinforcementLevel,
        );
        const reinforcedSlashGauntlets = reinforcedValue(
            gauntlets.Defenses.Slash,
            this.getGauntlets().reinforcementLevel,
        );
        const reinforcedSlashLeggings = reinforcedValue(
            leggings.Defenses.Slash,
            this.getLeggings().reinforcementLevel,
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

    public strikeDefense(physicalDefense: number): number {
        const helmet = this.getHelmet().data;
        const chestpiece = this.getChestpiece().data;
        const gauntlets = this.getGauntlets().data;
        const leggings = this.getLeggings().data;

        const reinforcedStrikeHelmet = reinforcedValue(
            helmet.Defenses.Strike,
            this.getHelmet().reinforcementLevel,
        );
        const reinforcedStrikeChestpiece = reinforcedValue(
            chestpiece.Defenses.Strike,
            this.getChestpiece().reinforcementLevel,
        );
        const reinforcedStrikeGauntlets = reinforcedValue(
            gauntlets.Defenses.Strike,
            this.getGauntlets().reinforcementLevel,
        );
        const reinforcedStrikeLeggings = reinforcedValue(
            leggings.Defenses.Strike,
            this.getLeggings().reinforcementLevel,
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
