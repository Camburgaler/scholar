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
    TargetType: string;
    Target: string;
    Method: string;
    Value: number;
}

export default Modifier;
