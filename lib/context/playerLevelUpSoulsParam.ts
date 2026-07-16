import PlayerLevelUpSoulsParam from "@/lib/types/playerLevelUpSoulsParam";
import { createContext } from "react";

let playerLevelUpSouls: PlayerLevelUpSoulsParam[] = require("@/lib/data/PlayerLevelUpSoulsParam.json");

const PlayerLevelUpSoulsContext = createContext(playerLevelUpSouls);

export default PlayerLevelUpSoulsContext;
