import { Classes } from "@/lib/gameData";
import Class from "@/lib/interfaces/class";

/**
 * @description Get a class by name.
 * @param name The name of the class to get.
 * @returns The class with the given name. {@link Class}
 */
export function getClassByName(name: string): Class | undefined {
    return Classes.find((c) => c.Name === name);
}
