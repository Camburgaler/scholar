import ArmorSet from "@/lib/classes/armorSet";
import Armor from "@/lib/interfaces/armor";
import EquippedArmor from "@/lib/interfaces/equippedArmor";

function createTestArmor(name: string): Armor {
    return {
        Defenses: {
            Slash: {
                Slope: 0,
                Intercept: 0,
            },
            Thrust: {
                Slope: 0,
                Intercept: 0,
            },
            Strike: {
                Slope: 0,
                Intercept: 0,
            },
            Standard: {
                Slope: 0,
                Intercept: 0,
            },
            Magic: {
                Slope: 0,
                Intercept: 0,
            },
            Lightning: {
                Slope: 0,
                Intercept: 0,
            },
            Fire: {
                Slope: 0,
                Intercept: 0,
            },
            Dark: {
                Slope: 0,
                Intercept: 0,
            },
        },
        DefenseScalingPhysical: 0,
        DefenseScalingSlash: 0,
        DefenseScalingThrust: 0,
        DefenseScalingStrike: 0,
        Resistances: {
            Poison: {
                Slope: 0,
                Intercept: 0,
            },
            Bleed: {
                Slope: 0,
                Intercept: 0,
            },
            Petrify: {
                Slope: 0,
                Intercept: 0,
            },
            Curse: {
                Slope: 0,
                Intercept: 0,
            },
        },
        Poise: 0,
        Requirements: {
            Strength: 0,
            Dexterity: 0,
            Intelligence: 0,
            Faith: 0,
        },
        ItemDiscovery: 0,
        MaxReinforcementLevel: 0,
        Name: name,
        Modifiers: [],
        Weight: 0,
        Durability: 0,
        RepairCost: 0,
    };
}

function createTestEquippedArmor(name: string): EquippedArmor {
    return {
        data: createTestArmor(name),
        reinforcementLevel: 0,
    };
}

describe("ArmorSet Class", () => {
    it("should create a new armor set", () => {
        const armorSet = new ArmorSet();
        expect(armorSet).toBeInstanceOf(ArmorSet);
    });

    it("should create an armor set from another armor set", () => {
        const originalArmorSet = new ArmorSet();
        const newArmorSet = ArmorSet.fromArmorSet(originalArmorSet);
        expect(newArmorSet).toBeInstanceOf(ArmorSet);
    });

    it("should create an armor set from equipped armor", () => {
        const helmet: EquippedArmor = createTestEquippedArmor("Helmet");
        const chestpiece: EquippedArmor = createTestEquippedArmor("Chestpiece");
        const gauntlets: EquippedArmor = createTestEquippedArmor("Gauntlets");
        const leggings: EquippedArmor = createTestEquippedArmor("Leggings");
        const armorSet = ArmorSet.fromEquippedArmor(
            helmet,
            chestpiece,
            gauntlets,
            leggings,
        );
        expect(armorSet).toBeInstanceOf(ArmorSet);
    });

    it("should create an armor set from armor", () => {
        const helmet: Armor = createTestArmor("Helmet");
        const chestpiece: Armor = createTestArmor("Chestpiece");
        const gauntlets: Armor = createTestArmor("Gauntlets");
        const leggings: Armor = createTestArmor("Leggings");
        const armorSet = ArmorSet.fromArmor(
            helmet,
            chestpiece,
            gauntlets,
            leggings,
        );
        expect(armorSet).toBeInstanceOf(ArmorSet);
    });

    it("should get the armor set data for a given field", () => {
        const armorSet = new ArmorSet();

        const helmet = armorSet.getArmor("helmet");
        const chestpiece = armorSet.getArmor("chestpiece");
        const gauntlets = armorSet.getArmor("gauntlets");
        const leggings = armorSet.getArmor("leggings");

        expect(helmet).toBeDefined();
        expect(chestpiece).toBeDefined();
        expect(gauntlets).toBeDefined();
        expect(leggings).toBeDefined();
    });

    it("should set the armor set data for a given field", () => {
        const armorSet = new ArmorSet();
        const helmet = createTestEquippedArmor("Helmet");
        const chestpiece = createTestEquippedArmor("Chestpiece");
        const gauntlets = createTestEquippedArmor("Gauntlets");
        const leggings = createTestEquippedArmor("Leggings");

        armorSet.setArmor("helmet", helmet);
        armorSet.setArmor("chestpiece", chestpiece);
        armorSet.setArmor("gauntlets", gauntlets);
        armorSet.setArmor("leggings", leggings);

        expect(armorSet.getArmor("helmet")).toBe(helmet);
        expect(armorSet.getArmor("chestpiece")).toBe(chestpiece);
        expect(armorSet.getArmor("gauntlets")).toBe(gauntlets);
        expect(armorSet.getArmor("leggings")).toBe(leggings);
    });

    it("should copy the armor set data from another armor set", () => {
        const sourceArmorSet = new ArmorSet();
        const helmet = createTestEquippedArmor("Helmet");
        const chestpiece = createTestEquippedArmor("Chestpiece");
        const gauntlets = createTestEquippedArmor("Gauntlets");
        const leggings = createTestEquippedArmor("Leggings");

        sourceArmorSet.setArmor("helmet", helmet);
        sourceArmorSet.setArmor("chestpiece", chestpiece);
        sourceArmorSet.setArmor("gauntlets", gauntlets);
        sourceArmorSet.setArmor("leggings", leggings);

        const targetArmorSet = new ArmorSet();
        targetArmorSet.copyFrom(sourceArmorSet);

        expect(targetArmorSet.getArmor("helmet")).toBe(helmet);
        expect(targetArmorSet.getArmor("chestpiece")).toBe(chestpiece);
        expect(targetArmorSet.getArmor("gauntlets")).toBe(gauntlets);
        expect(targetArmorSet.getArmor("leggings")).toBe(leggings);
    });

    it("should return the total weight of the armor set", () => {
        const armorSet = new ArmorSet();
        const helmet = createTestEquippedArmor("Helmet");
        const chestpiece = createTestEquippedArmor("Chestpiece");
        const gauntlets = createTestEquippedArmor("Gauntlets");
        const leggings = createTestEquippedArmor("Leggings");

        helmet.data.Weight = 1;
        chestpiece.data.Weight = 2;
        gauntlets.data.Weight = 3;
        leggings.data.Weight = 4;

        armorSet.setArmor("helmet", helmet);
        armorSet.setArmor("chestpiece", chestpiece);
        armorSet.setArmor("gauntlets", gauntlets);
        armorSet.setArmor("leggings", leggings);

        expect(armorSet.weight).toBe(10);
    });

    it("should return the total defense of the armor set for a given defense type", () => {
        const armorSet = new ArmorSet();
        const helmet = createTestEquippedArmor("Helmet");
        const chestpiece = createTestEquippedArmor("Chestpiece");
        const gauntlets = createTestEquippedArmor("Gauntlets");
        const leggings = createTestEquippedArmor("Leggings");

        helmet.data.Defenses.Standard = { Slope: 0, Intercept: 10 };
        chestpiece.data.Defenses.Standard = { Slope: 0, Intercept: 20 };
        gauntlets.data.Defenses.Standard = { Slope: 0, Intercept: 15 };
        leggings.data.Defenses.Standard = { Slope: 0, Intercept: 15 };

        armorSet.setArmor("helmet", helmet);
        armorSet.setArmor("chestpiece", chestpiece);
        armorSet.setArmor("gauntlets", gauntlets);
        armorSet.setArmor("leggings", leggings);

        expect(armorSet.defense("Standard")).toBe(60);
    });

    it("should return the total resistance of the armor set for a given damage type", () => {
        const armorSet = new ArmorSet();
        const helmet = createTestEquippedArmor("Helmet");
        const chestpiece = createTestEquippedArmor("Chestpiece");
        const gauntlets = createTestEquippedArmor("Gauntlets");
        const leggings = createTestEquippedArmor("Leggings");

        helmet.data.Resistances.Poison = { Slope: 0, Intercept: 10 };
        chestpiece.data.Resistances.Poison = { Slope: 0, Intercept: 20 };
        gauntlets.data.Resistances.Poison = { Slope: 0, Intercept: 15 };
        leggings.data.Resistances.Poison = { Slope: 0, Intercept: 15 };

        armorSet.setArmor("helmet", helmet);
        armorSet.setArmor("chestpiece", chestpiece);
        armorSet.setArmor("gauntlets", gauntlets);
        armorSet.setArmor("leggings", leggings);

        expect(armorSet.resistance("Poison")).toBe(60);
    });

    it("should return the total poise of the armor set", () => {
        const armorSet = new ArmorSet();
        const helmet = createTestEquippedArmor("Helmet");
        const chestpiece = createTestEquippedArmor("Chestpiece");
        const gauntlets = createTestEquippedArmor("Gauntlets");
        const leggings = createTestEquippedArmor("Leggings");

        helmet.data.Poise = 1;
        chestpiece.data.Poise = 2;
        gauntlets.data.Poise = 3;
        leggings.data.Poise = 4;

        armorSet.setArmor("helmet", helmet);
        armorSet.setArmor("chestpiece", chestpiece);
        armorSet.setArmor("gauntlets", gauntlets);
        armorSet.setArmor("leggings", leggings);

        expect(armorSet.poise).toBe(10);
    });

    it("should return the total item discovery of the armor set", () => {
        const armorSet = new ArmorSet();
        const helmet = createTestEquippedArmor("Helmet");
        const chestpiece = createTestEquippedArmor("Chestpiece");
        const gauntlets = createTestEquippedArmor("Gauntlets");
        const leggings = createTestEquippedArmor("Leggings");

        helmet.data.ItemDiscovery = 1;
        chestpiece.data.ItemDiscovery = 2;
        gauntlets.data.ItemDiscovery = 3;
        leggings.data.ItemDiscovery = 4;

        armorSet.setArmor("helmet", helmet);
        armorSet.setArmor("chestpiece", chestpiece);
        armorSet.setArmor("gauntlets", gauntlets);
        armorSet.setArmor("leggings", leggings);

        expect(armorSet.itemDiscovery).toBe(10);
    });

    it("should return the modifier displays for the armor set", () => {
        const armorSet = new ArmorSet();
        const helmet = createTestEquippedArmor("Helmet");
        const chestpiece = createTestEquippedArmor("Chestpiece");
        const gauntlets = createTestEquippedArmor("Gauntlets");
        const leggings = createTestEquippedArmor("Leggings");

        helmet.data.Modifiers = [
            {
                Description: "Test Modifier",
                TargetType: "Standard",
                Target: "Defense",
                Method: "additive",
                Value: 10,
            },
        ];

        armorSet.setArmor("helmet", helmet);
        armorSet.setArmor("chestpiece", chestpiece);
        armorSet.setArmor("gauntlets", gauntlets);
        armorSet.setArmor("leggings", leggings);

        expect(armorSet.modifierDisplays.length).toBe(1);
    });

    it("should return the active effects of the armor set", () => {
        const armorSet = new ArmorSet();
        const helmet = createTestEquippedArmor("Helmet");
        const chestpiece = createTestEquippedArmor("Chestpiece");
        const gauntlets = createTestEquippedArmor("Gauntlets");
        const leggings = createTestEquippedArmor("Leggings");

        helmet.data.Modifiers = [
            {
                Description: "Test Effect",
                TargetType: "Standard",
                Target: "Defense",
                Method: "additive",
                Value: 10,
            },
        ];

        armorSet.setArmor("helmet", helmet);
        armorSet.setArmor("chestpiece", chestpiece);
        armorSet.setArmor("gauntlets", gauntlets);
        armorSet.setArmor("leggings", leggings);

        expect(armorSet.activeEffects.length).toBe(1);
    });

    it("should return the correct attribute modifier for a given attribute", () => {
        const armorSet = new ArmorSet();
        const helmet = createTestEquippedArmor("Helmet");
        const chestpiece = createTestEquippedArmor("Chestpiece");
        const gauntlets = createTestEquippedArmor("Gauntlets");
        const leggings = createTestEquippedArmor("Leggings");

        helmet.data.Modifiers = [
            {
                Description: "Test Effect",
                TargetType: "attribute",
                Target: "Strength",
                Method: "additive",
                Value: 1,
            },
        ];

        armorSet.setArmor("helmet", helmet);
        armorSet.setArmor("chestpiece", chestpiece);
        armorSet.setArmor("gauntlets", gauntlets);
        armorSet.setArmor("leggings", leggings);

        expect(armorSet.attributeModifier("Strength")).toBe(1);
    });

    // TODO: Test the fitness function once implemented
    it("should return the correct fitness value", () => {
        const armorSet = new ArmorSet();
        const helmet = createTestEquippedArmor("Helmet");
        const chestpiece = createTestEquippedArmor("Chestpiece");
        const gauntlets = createTestEquippedArmor("Gauntlets");
        const leggings = createTestEquippedArmor("Leggings");

        armorSet.setArmor("helmet", helmet);
        armorSet.setArmor("chestpiece", chestpiece);
        armorSet.setArmor("gauntlets", gauntlets);
        armorSet.setArmor("leggings", leggings);

        expect(armorSet.fitness()).toBe(0);
    });
});
