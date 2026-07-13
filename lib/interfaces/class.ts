interface Stats {
    Vigor: number;
    Endurance: number;
    Vitality: number;
    Adaptability: number;
    Strength: number;
    Dexterity: number;
    Intelligence: number;
    Faith: number;
    Attunement: number;
}

export default interface Class {
    Name: string;
    Level: number;
    Stats: Stats;
}
