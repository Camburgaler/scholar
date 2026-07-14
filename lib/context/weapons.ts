import Weapon from "@/lib/types/weapon";
import { createContext } from "react";

let weapons: Weapon[] = require("@/lib/data/Weapons.json");

const WeaponContext = createContext(weapons);

export default WeaponContext;
