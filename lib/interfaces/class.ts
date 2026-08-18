import AttributeMap from "@/lib/types/attributeMap";

/**
 * An interface representing a starting class.
 * @interface Class
 * @member Name - The name of the class.
 * @member Level - The level of the class.
 * @member Attributes - The attributes of the class. {@link AttributeMap<number>}
 * @member sortingValue - The sorting value of the class. Optional.
 */
interface Class {
    // Fields from the JSON file
    Name: string;
    Level: number;
    Attributes: AttributeMap<number>;

    // Calculated fields
    sortingValue?: number;
}

export default Class;
