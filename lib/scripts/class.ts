import { Classes } from "@/lib/gameData";
import Class from "@/lib/interfaces/class";

export function getClassByName(name: string): Class | undefined {
    return Classes.find((c) => c.Name === name);
}
