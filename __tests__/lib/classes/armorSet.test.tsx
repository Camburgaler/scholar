/**
 * @fileoverview Tests for ArmorSet domain class
 */
import ArmorSet from "@/lib/classes/armorSet";
import type Armor from "@/lib/interfaces/armor";
import type EquippedArmor from "@/lib/interfaces/equippedArmor";
import SlopeIntercept from "@/lib/interfaces/slopeIntercept";
import DefenseMap from "@/lib/types/defenseMap";
import ResistanceMap from "@/lib/types/resistanceMap";
import { describe, expect, it } from "vitest";

describe("ArmorSet", () => {
    describe("initialization", () => {
        it("creates armor set with default No Armor pieces", () => {
            const armorSet = new ArmorSet();
            expect(armorSet.helmet.reinforcementLevel).toBe(0);
            expect(armorSet.chestpiece.reinforcementLevel).toBe(0);
            expect(armorSet.gauntlets.reinforcementLevel).toBe(0);
            expect(armorSet.leggings.reinforcementLevel).toBe(0);
        });
    });

    describe("static factories", () => {
        describe("fromArmorSet", () => {
            it("creates independent copy", () => {
                const original = new ArmorSet();
                original.helmet.reinforcementLevel = 7;

                const copy = ArmorSet.fromArmorSet(original);
                copy.helmet.reinforcementLevel = 10;

                expect(original.helmet.reinforcementLevel).toBe(7);
                expect(copy.helmet.reinforcementLevel).toBe(10);
            });
        });

        describe("fromEquippedArmor", () => {
            it("creates independent copy", () => {
                const equippedArmor: EquippedArmor = {
                    data: {} as Armor,
                    reinforcementLevel: 4,
                };
                const copy = ArmorSet.fromEquippedArmor(
                    equippedArmor,
                    equippedArmor,
                    equippedArmor,
                    equippedArmor,
                );
                expect(copy.helmet.reinforcementLevel).toBe(4);
                expect(copy.chestpiece.reinforcementLevel).toBe(4);
                expect(copy.gauntlets.reinforcementLevel).toBe(4);
                expect(copy.leggings.reinforcementLevel).toBe(4);

                // Modify the copy and ensure original is unaffected
                copy.helmet.reinforcementLevel = 6;
                expect(equippedArmor.reinforcementLevel).toBe(4);
                expect(copy.helmet.reinforcementLevel).toBe(6);

                // Modify the original and ensure copy is unaffected
                equippedArmor.reinforcementLevel = 8;
                expect(equippedArmor.reinforcementLevel).toBe(8);
                expect(copy.helmet.reinforcementLevel).toBe(6);
            });
        });

        describe("fromArmor", () => {
            it("creates independent copy", () => {
                const armor: Armor = {} as Armor;
                const copy = ArmorSet.fromArmor(armor, armor, armor, armor);
                expect(copy.helmet.data).toStrictEqual(armor);
                expect(copy.chestpiece.data).toStrictEqual(armor);
                expect(copy.gauntlets.data).toStrictEqual(armor);
                expect(copy.leggings.data).toStrictEqual(armor);

                // Modify the copy and ensure original is unaffected
                copy.helmet.data.Name = "Modified Helmet";
                expect(armor.Name).not.toBe("Modified Helmet");
                expect(copy.helmet.data.Name).toBe("Modified Helmet");

                // Modify the original and ensure copy is unaffected
                armor.Name = "Original Helmet";
                expect(armor.Name).toBe("Original Helmet");
                expect(copy.helmet.data.Name).toBe("Modified Helmet");
            });
        });
    });

    describe("getters and setters", () => {
        describe("getArmor", () => {
            it("returns helmet with reinforcement level", () => {
                const armorSet = new ArmorSet();
                const mockArmor: EquippedArmor = {
                    data: {} as Armor,
                    reinforcementLevel: 5,
                };

                armorSet.helmet = mockArmor;
                const retrievedArmor = armorSet.getArmor("helmet");
                expect(retrievedArmor.reinforcementLevel).toBe(5);
            });

            it("panics when undefined armor piece is requested", () => {
                const armorSet = new ArmorSet();
                armorSet.helmet = undefined as unknown as EquippedArmor;
                expect(() => armorSet.getArmor("helmet")).throws(
                    "ArmorSet slot 'helmet' is undefined",
                );
            });

            it("panics when null armor piece is requested", () => {
                const armorSet = new ArmorSet();
                armorSet.helmet = null as unknown as EquippedArmor;
                expect(() => armorSet.getArmor("helmet")).throws(
                    "ArmorSet slot 'helmet' is undefined",
                );
            });

            it("panics when non-object armor piece is requested", () => {
                const armorSet = new ArmorSet();
                armorSet.helmet = 0 as unknown as EquippedArmor;
                expect(() => armorSet.getArmor("helmet")).throws(
                    "ArmorSet slot 'helmet' is not an object. Type: number, Value: 0",
                );
            });
        });

        describe("setArmor", () => {
            it("equips helmet with reinforcement level", () => {
                const armorSet = new ArmorSet();
                const mockArmor: EquippedArmor = {
                    data: {} as Armor,
                    reinforcementLevel: 5,
                };

                armorSet.setArmor("helmet", mockArmor);
                expect(armorSet.helmet.reinforcementLevel).toBe(5);
            });

            it("throws error when trying to set undefined armor piece", () => {
                const armorSet = new ArmorSet();
                expect(() =>
                    armorSet.setArmor(
                        "helmet",
                        undefined as unknown as EquippedArmor,
                    ),
                ).throws(
                    "Cannot set ArmorSet slot 'helmet' to undefined or null",
                );
            });

            it("throws error when trying to set null armor piece", () => {
                const armorSet = new ArmorSet();
                expect(() =>
                    armorSet.setArmor(
                        "helmet",
                        null as unknown as EquippedArmor,
                    ),
                ).throws(
                    "Cannot set ArmorSet slot 'helmet' to undefined or null",
                );
            });

            it("throws error when trying to set non-object armor piece", () => {
                const armorSet = new ArmorSet();
                expect(() =>
                    armorSet.setArmor("helmet", 0 as unknown as EquippedArmor),
                ).throws(
                    "Cannot set ArmorSet slot 'helmet' to a non-EquippedArmor object",
                );
            });
        });

        describe("copyFrom", () => {
            it("copies all armor pieces from another set", () => {
                const source = new ArmorSet();
                source.helmet.reinforcementLevel = 3;
                source.chestpiece.reinforcementLevel = 5;

                const target = new ArmorSet();
                target.copyFrom(source);

                expect(target.helmet.reinforcementLevel).toBe(3);
                expect(target.chestpiece.reinforcementLevel).toBe(5);
            });
        });
    });

    describe("methods", () => {
        describe("weight", () => {
            it("calculates total weight of armor set", () => {
                const armorSet = new ArmorSet();
                armorSet.helmet.data.Weight = 2;
                armorSet.chestpiece.data.Weight = 5;
                armorSet.gauntlets.data.Weight = 1;
                armorSet.leggings.data.Weight = 3;

                expect(armorSet.weight).toBe(11);
            });
        });

        describe("poise", () => {
            it("calculates total poise of armor set", () => {
                const armorSet = new ArmorSet();
                armorSet.helmet.data.Poise = 1;
                armorSet.chestpiece.data.Poise = 2;
                armorSet.gauntlets.data.Poise = 1;
                armorSet.leggings.data.Poise = 3;

                expect(armorSet.poise).toBe(7);
            });
        });

        describe("itemDiscovery", () => {
            it("calculates total item discovery of armor set", () => {
                const armorSet = new ArmorSet();
                armorSet.helmet.data.ItemDiscovery = 10;
                armorSet.chestpiece.data.ItemDiscovery = 20;
                armorSet.gauntlets.data.ItemDiscovery = 5;
                armorSet.leggings.data.ItemDiscovery = 15;

                expect(armorSet.itemDiscovery).toBe(50);
            });
        });

        describe("modifierDisplays", () => {
            it("returns an array of ModifierDisplay components", () => {
                const armorSet = new ArmorSet();
                armorSet.helmet.data.Modifiers = [
                    {
                        Description: "Increases health by 10%",
                        TargetType: "attribute",
                        Target: "health",
                        Value: 0.1,
                        Method: "multiplicative",
                        SpEffect: "",
                    },
                ];

                const modifiers = armorSet.modifierDisplays;
                expect(Array.isArray(modifiers)).toBe(true);
                expect(modifiers.length).toBe(1);
                expect(modifiers[0].type.name).toBe("ModifierDisplay");
            });

            it("returns an empty array when no modifiers are present", () => {
                const armorSet = new ArmorSet();

                expect(armorSet.modifierDisplays.length).toEqual(0);
            });

            it("returns a JSX element for each modifier in the armor set", () => {
                const armorSet = new ArmorSet();

                armorSet.helmet.data.Modifiers = [
                    {
                        Description: "Increases health by 10%",
                        TargetType: "attribute",
                        Target: "health",
                        Value: 0.1,
                        Method: "multiplicative",
                        SpEffect: "",
                    },
                ];
                armorSet.helmet.data.ItemDiscovery = 10;

                armorSet.chestpiece.data.Modifiers = [
                    {
                        Description: "Increases stamina by 5%",
                        TargetType: "attribute",
                        Target: "stamina",
                        Value: 0.05,
                        Method: "multiplicative",
                        SpEffect: "",
                    },
                ];
                armorSet.chestpiece.data.ItemDiscovery = 20;

                armorSet.gauntlets.data.Modifiers = [
                    {
                        Description: "Increases strength by 5",
                        TargetType: "attribute",
                        Target: "strength",
                        Value: 5,
                        Method: "additive",
                        SpEffect: "",
                    },
                ];
                armorSet.gauntlets.data.ItemDiscovery = 5;

                armorSet.leggings.data.Modifiers = [
                    {
                        Description: "Increases dexterity by 3",
                        TargetType: "attribute",
                        Target: "dexterity",
                        Value: 3,
                        Method: "additive",
                        SpEffect: "",
                    },
                ];
                armorSet.leggings.data.ItemDiscovery = 15;

                const modifierDisplays = armorSet.modifierDisplays;
                expect(modifierDisplays.length).toBe(8);

                for (const display of modifierDisplays) {
                    expect(display.type.name).toBe("ModifierDisplay");
                }
            });
        });

        describe("activeEffects", () => {
            it("returns an array of Modifiers from all armor pieces", () => {
                const armorSet = new ArmorSet();
                armorSet.helmet.data.Modifiers = [
                    {
                        Description: "Increases health by 10%",
                        TargetType: "attribute",
                        Target: "health",
                        Value: 0.1,
                        Method: "multiplicative",
                        SpEffect: "",
                    },
                ];
                armorSet.chestpiece.data.Modifiers = [
                    {
                        Description: "Increases stamina by 5%",
                        TargetType: "attribute",
                        Target: "stamina",
                        Value: 0.05,
                        Method: "multiplicative",
                        SpEffect: "",
                    },
                ];
                armorSet.gauntlets.data.Modifiers = [
                    {
                        Description: "Increases strength by 5",
                        TargetType: "attribute",
                        Target: "strength",
                        Value: 5,
                        Method: "additive",
                        SpEffect: "",
                    },
                ];
                armorSet.leggings.data.Modifiers = [
                    {
                        Description: "Increases dexterity by 3",
                        TargetType: "attribute",
                        Target: "dexterity",
                        Value: 3,
                        Method: "additive",
                        SpEffect: "",
                    },
                ];

                const activeEffects = armorSet.activeEffects;
                expect(Array.isArray(activeEffects)).toBe(true);
                expect(activeEffects.length).toBe(4);
            });
        });

        describe("defense", () => {
            it("calculates total defense of armor set", () => {
                const armorSet = new ArmorSet();
                armorSet.helmet.data.Defenses = {
                    Standard: { Slope: 0, Intercept: 5 },
                } as DefenseMap<SlopeIntercept>;
                armorSet.chestpiece.data.Defenses = {
                    Standard: { Slope: 0, Intercept: 10 },
                } as DefenseMap<SlopeIntercept>;
                armorSet.gauntlets.data.Defenses = {
                    Standard: { Slope: 0, Intercept: 3 },
                } as DefenseMap<SlopeIntercept>;
                armorSet.leggings.data.Defenses = {
                    Standard: { Slope: 0, Intercept: 7 },
                } as DefenseMap<SlopeIntercept>;

                const standardDefense = armorSet.defense("Standard");
                expect(standardDefense).toBe(25);
            });
        });

        describe("resistance", () => {
            it("calculates total resistance of armor set", () => {
                const armorSet = new ArmorSet();
                armorSet.helmet.data.Resistances = {
                    Bleed: { Slope: 0, Intercept: 5 },
                } as ResistanceMap<SlopeIntercept>;
                armorSet.chestpiece.data.Resistances = {
                    Bleed: { Slope: 0, Intercept: 10 },
                } as ResistanceMap<SlopeIntercept>;
                armorSet.gauntlets.data.Resistances = {
                    Bleed: { Slope: 0, Intercept: 3 },
                } as ResistanceMap<SlopeIntercept>;
                armorSet.leggings.data.Resistances = {
                    Bleed: { Slope: 0, Intercept: 7 },
                } as ResistanceMap<SlopeIntercept>;

                const bleedResistance = armorSet.resistance("Bleed");
                expect(bleedResistance).toBe(25);
            });
        });

        describe("attributeModifier", () => {
            it("calculates total attribute modifier of armor set", () => {
                const armorSet = new ArmorSet();
                armorSet.helmet.data.Modifiers = [
                    {
                        Description: "Increases Strength by 1",
                        TargetType: "attribute",
                        Target: "Strength",
                        Value: 1,
                        Method: "additive",
                        SpEffect: "",
                    },
                ];
                armorSet.chestpiece.data.Modifiers = [
                    {
                        Description: "Increases Strength by 2",
                        TargetType: "attribute",
                        Target: "Strength",
                        Value: 2,
                        Method: "additive",
                        SpEffect: "",
                    },
                ];
                armorSet.gauntlets.data.Modifiers = [
                    {
                        Description: "Decreases Strength by 1",
                        TargetType: "attribute",
                        Target: "Strength",
                        Value: -1,
                        Method: "additive",
                        SpEffect: "",
                    },
                ];
                armorSet.leggings.data.Modifiers = [
                    {
                        Description: "Increases Dexterity by 3",
                        TargetType: "attribute",
                        Target: "Dexterity",
                        Value: 3,
                        Method: "additive",
                        SpEffect: "",
                    },
                ];

                expect(armorSet.attributeModifier("Strength")).toBe(2);
                expect(armorSet.attributeModifier("Dexterity")).toBe(3);
            });
        });

        describe("thrustDefense", () => {
            it("calculates total thrust defense of armor set", () => {
                const armorSet = new ArmorSet();

                armorSet.helmet.data.Defenses = {
                    Thrust: { Slope: 0, Intercept: 3 },
                } as DefenseMap<SlopeIntercept>;
                armorSet.helmet.data.DefenseScalingPhysical = 1;

                armorSet.chestpiece.data.Defenses = {
                    Thrust: { Slope: 0, Intercept: 6 },
                } as DefenseMap<SlopeIntercept>;
                armorSet.chestpiece.data.DefenseScalingPhysical = 1;

                armorSet.gauntlets.data.Defenses = {
                    Thrust: { Slope: 0, Intercept: 9 },
                } as DefenseMap<SlopeIntercept>;
                armorSet.gauntlets.data.DefenseScalingPhysical = 1;

                armorSet.leggings.data.Defenses = {
                    Thrust: { Slope: 0, Intercept: 12 },
                } as DefenseMap<SlopeIntercept>;
                armorSet.leggings.data.DefenseScalingPhysical = 1;

                const thrustDefense = armorSet.thrustDefense(1);
                expect(thrustDefense).toBe(34);
            });
        });

        describe("slashDefense", () => {
            it("calculates total slash defense of armor set", () => {
                const armorSet = new ArmorSet();

                armorSet.helmet.data.Defenses = {
                    Slash: { Slope: 0, Intercept: 3 },
                } as DefenseMap<SlopeIntercept>;
                armorSet.helmet.data.DefenseScalingPhysical = 1;

                armorSet.chestpiece.data.Defenses = {
                    Slash: { Slope: 0, Intercept: 6 },
                } as DefenseMap<SlopeIntercept>;
                armorSet.chestpiece.data.DefenseScalingPhysical = 1;

                armorSet.gauntlets.data.Defenses = {
                    Slash: { Slope: 0, Intercept: 9 },
                } as DefenseMap<SlopeIntercept>;
                armorSet.gauntlets.data.DefenseScalingPhysical = 1;

                armorSet.leggings.data.Defenses = {
                    Slash: { Slope: 0, Intercept: 12 },
                } as DefenseMap<SlopeIntercept>;
                armorSet.leggings.data.DefenseScalingPhysical = 1;

                const slashDefense = armorSet.slashDefense(1);
                expect(slashDefense).toBe(34);
            });
        });

        describe("strikeDefense", () => {
            it("calculates total strike defense of armor set", () => {
                const armorSet = new ArmorSet();

                armorSet.helmet.data.Defenses = {
                    Strike: { Slope: 0, Intercept: 3 },
                } as DefenseMap<SlopeIntercept>;
                armorSet.helmet.data.DefenseScalingPhysical = 1;

                armorSet.chestpiece.data.Defenses = {
                    Strike: { Slope: 0, Intercept: 6 },
                } as DefenseMap<SlopeIntercept>;
                armorSet.chestpiece.data.DefenseScalingPhysical = 1;

                armorSet.gauntlets.data.Defenses = {
                    Strike: { Slope: 0, Intercept: 9 },
                } as DefenseMap<SlopeIntercept>;
                armorSet.gauntlets.data.DefenseScalingPhysical = 1;

                armorSet.leggings.data.Defenses = {
                    Strike: { Slope: 0, Intercept: 12 },
                } as DefenseMap<SlopeIntercept>;
                armorSet.leggings.data.DefenseScalingPhysical = 1;

                const strikeDefense = armorSet.strikeDefense(1);
                expect(strikeDefense).toBe(34);
            });
        });
    });
});
