import VowParam from "@/lib/types/vowParam";
import { createContext } from "react";

let vows: VowParam[] = require("@/lib/data/VowParam.json");

const VowContext = createContext(vows);

export default VowContext;
