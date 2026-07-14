import Armor from "@/lib/types/armor";
import { createContext } from "react";

let chestpieces: Armor[] = require("@/lib/data/Chestpieces.json");

const ChestpieceContext = createContext(chestpieces);

export default ChestpieceContext;
