/**
 * @interface Modifier
 * @description An interface representing a modifier.
 * @member Description - The description of the modifier.
 * @member TargetType - The type of the target of the modifier.
 * @member Target - The target of the modifier.
 * @member Method - The method by which the modifier is applied.
 * @member Value - The value of the modifier.
 */
interface Modifier {
    Description: string;
    TargetType: "attribute" | "stat" | "special";
    Target: string;
    Method: "additive" | "multiplicative" | "toggle";
    Value: number;
    SpEffect: string;
}

export default Modifier;
