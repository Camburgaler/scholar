import { useSortingConfig } from "@/lib/reducers/configs/sortingConfig";
import {
    useWikiTarget,
    useWikiTargetDispatch,
} from "@/lib/reducers/configs/wikiTarget";

export default function Configs() {
    // Context
    const wikiTarget = useWikiTarget();
    const setWikiTarget = useWikiTargetDispatch();
    const sortingConfig = useSortingConfig();

    // Constants

    return (
        <div className="flex flex-col w-full items-center justify-center align-center">
            <h2 className="text-2xl text-center font-bold">Configs</h2>
            <hr />

            {/* Global configs */}
            <div className="flex flex-col w-full items-center justify-center align-center">
                {/* Wiki link target */}
                <div className="flex gap-5 w-full items-center justify-center align-center">
                    <h3 className="text-lg font-bold">Wiki Link Target:</h3>

                    {/* wiki.gg */}
                    <div>
                        <input
                            type="radio"
                            id="wikiGG"
                            name="wikiTarget"
                            value="wikiGG"
                            checked={wikiTarget === "wikiGG"}
                            onChange={() => setWikiTarget({ value: "wikiGG" })}
                        />
                        <label htmlFor="wikiGG">wiki.gg</label>
                    </div>

                    {/* fextralife */}
                    <div>
                        <input
                            type="radio"
                            id="fextralife"
                            name="wikiTarget"
                            value="fextralife"
                            checked={wikiTarget === "fextralife"}
                            onChange={() =>
                                setWikiTarget({ value: "fextralife" })
                            }
                        />
                        <label htmlFor="fextralife">FextraLife</label>
                    </div>

                    {/* wikidot */}
                    <div>
                        <input
                            type="radio"
                            id="wikiDot"
                            name="wikiTarget"
                            value="wikiDot"
                            checked={wikiTarget === "wikiDot"}
                            onChange={() => setWikiTarget({ value: "wikiDot" })}
                        />
                        <label htmlFor="wikiDot">Wikidot</label>
                    </div>
                </div>
            </div>
            <hr />

            {/* Sorting configs */}
            <div className="flex gap-5 w-full items-center justify-center align-center">
                <h3 className="text-lg font-bold">Sorting Config:</h3>
                <p>Current sorting config: {sortingConfig}</p>
            </div>
        </div>
    );
}
