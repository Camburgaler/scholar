import Ring from "@/lib/types/ring";
import { createContext } from "react";

let rings: Ring[] = require("@/lib/data/Rings.json");

const RingContext = createContext(rings);

export default RingContext;
