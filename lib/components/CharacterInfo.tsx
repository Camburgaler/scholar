import LeftColumn from "@/lib/components/characterInfo/LeftColumn";
import MiddleColumn from "@/lib/components/characterInfo/MiddleColumn";
import RightColumn from "@/lib/components/characterInfo/RightColumn";
import { FocusedAttributeProvider } from "@/lib/reducers/focusedAttribute";

export default function CharacterInfo() {
    return (
        <div className="flex flex-col w-full items-center justify-center align-center">
            {/* Header */}
            <h2 className="text-2xl font-bold">Character</h2>
            <hr />

            {/* Reducers */}
            <FocusedAttributeProvider>
                {/* Content */}
                <div className="flex w-full h-full items-center justify-center align-center gap-4">
                    <LeftColumn />

                    <hr className="h-full max-w-px" />

                    <MiddleColumn />

                    <hr className="h-full max-w-px" />

                    <RightColumn />
                </div>
            </FocusedAttributeProvider>
        </div>
    );
}
