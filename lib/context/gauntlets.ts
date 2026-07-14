import Armor from "@/lib/types/armor";
import { createContext } from "react";

let gauntlets: Armor[] = require("@/lib/data/Gauntlets.json");

const GauntletsContext = createContext(gauntlets);

export default GauntletsContext;
