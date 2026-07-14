import Armor from "@/lib/types/armor";
import { createContext } from "react";

let helmets: Armor[] = require("@/lib/data/Helmets.json");

const HelmetContext = createContext(helmets);

export default HelmetContext;
