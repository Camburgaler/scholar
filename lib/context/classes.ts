import Class from "@/lib/interfaces/class";
import { createContext } from "react";

let classes: Class[] = require("@/lib/data/Classes.json");

const ClassContext = createContext(classes);

export default ClassContext;
