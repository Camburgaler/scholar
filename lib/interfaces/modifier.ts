type TargetType = "attribute" | "stat" | "special";
type Method = "additive" | "multiplicative" | "special";

interface Modifier {
    Description: string;
    TargetType: TargetType;
    Target: string;
    Method: Method;
    Value: number;
}

export default Modifier;
