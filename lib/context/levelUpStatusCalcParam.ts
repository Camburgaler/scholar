import LevelUpStatusCalcParam from "@/lib/types/levelUpStatusCalcParam";
import { createContext } from "react";

let levelUpStatusCalcParam: LevelUpStatusCalcParam[] = require("@/lib/data/LevelUpStatusCalcParam.json");

const LevelUpStatusCalcParamContext = createContext(levelUpStatusCalcParam);

export default LevelUpStatusCalcParamContext;
