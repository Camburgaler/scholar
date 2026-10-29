import {
    AttributeToStatMap,
    Chestpieces,
    Classes,
    Covenants,
    Gauntlets,
    Helmets,
    Leggings,
    PlayerLevelUpSouls,
    Rings,
    Spells,
    Weapons,
} from "@/lib/gameData";

describe("gameData", () => {
    it("loads stat calculation data", () => {
        // Adaptability
        expect(AttributeToStatMap.Adaptability).not.toBeNull();
        expect(AttributeToStatMap.Adaptability?.MaximumHP).not.toBeNull();
        expect(
            AttributeToStatMap.Adaptability?.AttackPowerPoison,
        ).not.toBeNull();
        expect(
            AttributeToStatMap.Adaptability?.ResistancePoison,
        ).not.toBeNull();
        expect(AttributeToStatMap.Adaptability?.ResistanceBleed).not.toBeNull();
        expect(
            AttributeToStatMap.Adaptability?.ResistancePetrify,
        ).not.toBeNull();
        expect(AttributeToStatMap.Adaptability?.ResistanceCurse).not.toBeNull();
        expect(AttributeToStatMap.Adaptability?.Agility).not.toBeNull();
        expect(AttributeToStatMap.Adaptability?.Poise).not.toBeNull();

        // Attunement
        expect(AttributeToStatMap.Attunement).not.toBeNull();
        expect(AttributeToStatMap.Attunement?.MaximumHP).not.toBeNull();
        expect(AttributeToStatMap.Attunement?.SpellSlotCount).not.toBeNull();
        expect(AttributeToStatMap.Attunement?.SpellCastingSpeed).not.toBeNull();
        expect(AttributeToStatMap.Attunement?.ResistanceCurse).not.toBeNull();
        expect(AttributeToStatMap.Attunement?.Agility).not.toBeNull();

        // Dexterity
        expect(AttributeToStatMap.Dexterity).not.toBeNull();
        expect(AttributeToStatMap.Dexterity.MaximumHP).not.toBeNull();
        expect(
            AttributeToStatMap.Dexterity.PhysicalAttackPowerByDexterity,
        ).not.toBeNull();
        expect(AttributeToStatMap.Dexterity.AttackPowerPoison).not.toBeNull();
        expect(AttributeToStatMap.Dexterity.AttackPowerBleed).not.toBeNull();
        expect(AttributeToStatMap.Dexterity.Defense).not.toBeNull();

        // Endurance
        expect(AttributeToStatMap.Endurance).not.toBeNull();
        expect(AttributeToStatMap.Endurance?.MaximumHP).not.toBeNull();
        expect(AttributeToStatMap.Endurance?.MaximumStamina).not.toBeNull();
        expect(AttributeToStatMap.Endurance?.Defense).not.toBeNull();
        expect(AttributeToStatMap.Endurance?.Poise).not.toBeNull();

        // Faith
        expect(AttributeToStatMap.Faith).not.toBeNull();
        expect(AttributeToStatMap.Faith.MaximumHP).not.toBeNull();
        expect(AttributeToStatMap.Faith.SpellCastingSpeed).not.toBeNull();
        expect(AttributeToStatMap.Faith.AttackPowerFire).not.toBeNull();
        expect(AttributeToStatMap.Faith.AttackPowerLightning).not.toBeNull();
        expect(AttributeToStatMap.Faith.AttackPowerDark).not.toBeNull();
        expect(AttributeToStatMap.Faith.AttackPowerBleed).not.toBeNull();
        expect(AttributeToStatMap.Faith.AbsorptionFire).not.toBeNull();
        expect(AttributeToStatMap.Faith.AbsorptionLightning).not.toBeNull();
        expect(AttributeToStatMap.Faith.AbsorptionDark).not.toBeNull();
        expect(AttributeToStatMap.Faith.ResistanceBleed).not.toBeNull();

        // Intelligence
        expect(AttributeToStatMap.Intelligence).not.toBeNull();
        expect(AttributeToStatMap.Intelligence.MaximumHP).not.toBeNull();
        expect(
            AttributeToStatMap.Intelligence.SpellCastingSpeed,
        ).not.toBeNull();
        expect(AttributeToStatMap.Intelligence.AttackPowerMagic).not.toBeNull();
        expect(AttributeToStatMap.Intelligence.AttackPowerFire).not.toBeNull();
        expect(AttributeToStatMap.Intelligence.AttackPowerDark).not.toBeNull();
        expect(
            AttributeToStatMap.Intelligence.AttackPowerPoison,
        ).not.toBeNull();
        expect(AttributeToStatMap.Intelligence.AbsorptionMagic).not.toBeNull();
        expect(AttributeToStatMap.Intelligence.AbsorptionFire).not.toBeNull();
        expect(AttributeToStatMap.Intelligence.AbsorptionDark).not.toBeNull();

        // Strength
        expect(AttributeToStatMap.Strength).not.toBeNull();
        expect(AttributeToStatMap.Strength.MaximumHP).not.toBeNull();
        expect(
            AttributeToStatMap.Strength.PhysicalAttackPowerByStrength,
        ).not.toBeNull();
        expect(AttributeToStatMap.Strength.Defense).not.toBeNull();

        // Vigor
        expect(AttributeToStatMap.Vigor).not.toBeNull();
        expect(AttributeToStatMap.Vigor?.MaximumHP).not.toBeNull();
        expect(AttributeToStatMap.Vigor?.ResistancePetrify).not.toBeNull();

        // Vitality
        expect(AttributeToStatMap.Vitality).not.toBeNull();
        expect(AttributeToStatMap.Vitality?.MaximumHP).not.toBeNull();
        expect(AttributeToStatMap.Vitality?.MaximumEquipLoad).not.toBeNull();
        expect(AttributeToStatMap.Vitality?.Defense).not.toBeNull();
        expect(AttributeToStatMap.Vitality?.ResistancePoison).not.toBeNull();
    });

    it("loads class data", () => {
        expect(Classes).not.toBeNull();
        expect(Classes.length).toBe(8);
    });

    describe("armor", () => {
        it("loads helmet data", () => {
            expect(Helmets).not.toBeNull();
            expect(Helmets.length).toBe(122);
            expect(Helmets[0].Name).toBe("No Armor");
        });

        it("loads chestpiece data", () => {
            expect(Chestpieces).not.toBeNull();
            expect(Chestpieces.length).toBe(111);
            expect(Chestpieces[0].Name).toBe("No Armor");
        });

        it("loads gauntlets data", () => {
            expect(Gauntlets).not.toBeNull();
            expect(Gauntlets.length).toBe(103);
            expect(Gauntlets[0].Name).toBe("No Armor");
        });

        it("loads leggings data", () => {
            expect(Leggings).not.toBeNull();
            expect(Leggings.length).toBe(103);
            expect(Leggings[0].Name).toBe("No Armor");
        });
    });

    it("loads level data", () => {
        expect(PlayerLevelUpSouls).not.toBeNull();
        expect(PlayerLevelUpSouls.length).toBe(851);
    });

    it("loads ring data", () => {
        expect(Rings).not.toBeNull();
        expect(Rings.length).toBe(123);
        expect(Rings[0].Name).toBe("No Ring");
    });

    it("loads covenant data", () => {
        expect(Covenants).not.toBeNull();
        expect(Covenants.length).toBe(10);
        expect(Covenants[0]).toBe("None");
    });

    it("loads spell data", () => {
        expect(Spells).not.toBeNull();
        expect(Spells.length).toBe(106);
    });

    it("loads weapon data", () => {
        expect(Weapons).not.toBeNull();
        expect(Weapons.length).toBe(327);
        expect(Weapons[0].Name).toBe("Fists");
        expect(Weapons[1].Name).toBe("Fist (Vanquisher's Seal)");
    });
});
