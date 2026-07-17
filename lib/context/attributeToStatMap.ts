import StatMap from "@/lib/types/statMap";
import { createContext } from "react";
import AttributeMap from "../types/attributeMap";

let attributeToStatMap: AttributeMap<
    StatMap<boolean>
> = require("@/lib/data/AttributeToStatMap.json");

const AttributeToStatMapContext = createContext(attributeToStatMap);

export default AttributeToStatMapContext;
