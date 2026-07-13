import LeftColumn from "@/lib/componenets/character/LeftColumn";
import MiddleColumn from "@/lib/componenets/character/MiddleColumn";
import RightColumn from "@/lib/componenets/character/RightColumn";
import Class from "@/lib/interfaces/class";
import { fetchData } from "@/lib/scripts/scripts";
import { useEffect, useState } from "react";

export default function CharacterInfo() {
    const [classes, setClasses] = useState<Class[]>([]);

    useEffect(() => {
        fetchData<Class[]>("/api/data/class").then((res) => setClasses(res));
    }, []);

    return (
        <div className="flex flex-col w-full items-center justify-center align-center">
            {/* Header */}
            <h2 className="text-2xl font-bold">Character</h2>
            <hr />

            {/* Content */}
            <div className="flex w-full h-full items-center justify-center align-center gap-4">
                <LeftColumn classes={classes} />

                <hr className="h-full max-w-px" />

                <MiddleColumn />

                <hr className="h-full max-w-px" />

                <RightColumn />
            </div>
        </div>
    );
}
