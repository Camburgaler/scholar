import AttributeMap from "@/lib/types/attributeMap";

export default interface Class {
    // Fields from the JSON file
    Name: string;
    Level: number;
    Stats: AttributeMap<number>;

    // Calculated fields
    sortingValue: number;
}
