import AttributeMap from "@/lib/types/attributeMap";

type Class = {
    // Fields from the JSON file
    Name: string;
    Level: number;
    Attributes: AttributeMap<number>;

    // Calculated fields
    sortingValue?: number;
};

export default Class;
