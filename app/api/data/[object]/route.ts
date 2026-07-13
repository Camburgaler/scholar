import { NextRequest } from "next/server";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ object: string }> },
) {
    const object = (await params).object;

    switch (object) {
        case "class":
            return new Response(
                JSON.stringify(require("@/lib/data/Classes.json")),
            );
    }

    return new Response(JSON.stringify(object));
}
