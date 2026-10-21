import Armor from "@/lib/interfaces/armor";
import Modifier from "@/lib/interfaces/modifier";
import SlopeIntercept from "@/lib/interfaces/slopeIntercept";
import DefenseMap from "@/lib/types/defenseMap";
import ResistanceMap from "@/lib/types/resistanceMap";
import { UUID } from "crypto";

export default class EquippedArmor {
    private _id: UUID = "00000000-0000-0000-0000-000000000000";
    private _data: Armor;

    public reinforcementLevel: number = 0;

    // Static methods

    public static newWithReinforcementLevel(
        data: Armor,
        reinforcementLevel: number,
    ): EquippedArmor {
        const equippedArmor = new EquippedArmor(data);
        equippedArmor.reinforcementLevel = reinforcementLevel;
        return equippedArmor;
    }

    // Constructor
    constructor(data: Armor) {
        this._data = data;
        this._id = crypto.randomUUID() as UUID;
    }

    // Getters and Setters

    public get id(): UUID {
        return this._id;
    }

    public get name(): string {
        return this._data.Name;
    }

    public get poise(): number {
        return this._data.Poise;
    }

    public get itemDiscovery(): number {
        return this._data.ItemDiscovery;
    }

    public get maxReinforcementLevel(): number {
        return this._data.MaxReinforcementLevel;
    }

    public get weight(): number {
        return this._data.Weight;
    }

    public get defenses(): DefenseMap<SlopeIntercept> {
        return this._data.Defenses;
    }

    public get resistances(): ResistanceMap<SlopeIntercept> {
        return this._data.Resistances;
    }

    public get modifiers(): Modifier[] {
        return this._data.Modifiers;
    }

    public get defenseScalingPhysical(): number {
        return this._data.DefenseScalingPhysical;
    }

    public set data(data: Armor) {
        this._data = data;
    }

    // Public methods
}
