import StatMap from "@/lib/types/statMap";

export default interface Class {
    // Fields from the JSON file
    Name: string;
    Level: number;
    Stats: StatMap<number>;

    // Calculated fields
    sortingValue: number;
}
