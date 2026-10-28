/**
 * @fileoverview Tests for ArmorSet domain class
 */
import ArmorSet from "@/lib/classes/armorSet";
import type Armor from "@/lib/interfaces/armor";
import type EquippedArmor from "@/lib/interfaces/equippedArmor";
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

    describe("setArmor", () => {
        it("equips helmet with reinforcement level", () => {
            const armorSet = new ArmorSet();
            const mockArmor: EquippedArmor = {
                data: {} as Armor,
                reinforcementLevel: 5,
            };

            armorSet.helmet = mockArmor;
            expect(armorSet.helmet.reinforcementLevel).toBe(5);
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

    describe("static factories", () => {
        it("fromArmorSet creates independent copy", () => {
            const original = new ArmorSet();
            original.helmet.reinforcementLevel = 7;

            const copy = ArmorSet.fromArmorSet(original);
            copy.helmet.reinforcementLevel = 10;

            expect(original.helmet.reinforcementLevel).toBe(7);
            expect(copy.helmet.reinforcementLevel).toBe(10);
        });
    });
});
