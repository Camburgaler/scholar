import EquippedWeapon from "@/lib/classes/equippedWeapon";

describe("Equipped Weapon class", () => {
    it("should create a new equipped weapon", () => {
        const weapon = new EquippedWeapon();
        expect(weapon).toBeInstanceOf(EquippedWeapon);
    });
});
