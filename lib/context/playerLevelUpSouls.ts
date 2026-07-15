import { createContext } from "react";
import PlayerLevelUpSouls from "../types/playerLevelUpSouls";

let playerLevelUpSouls: PlayerLevelUpSouls[] = require("@/lib/data/PlayerLevelUpSoulsParam.json");

const PlayerLevelUpSoulsContext = createContext(playerLevelUpSouls);

export default PlayerLevelUpSoulsContext;
