import Armor from "@/lib/types/armor";
import { createContext } from "react";

let leggings: Armor[] = require("@/lib/data/Leggings.json");

const LeggingsContext = createContext(leggings);

export default LeggingsContext;
