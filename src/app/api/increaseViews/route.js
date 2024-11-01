import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import {findEmptyField} from "@/helpers/validators";
import {OwnerKey} from "@/helpers/ownerKey";
import {SanitizeMap} from "@/helpers/sanitize";

export const fetchCache = 'force-no-store';
export const revalidate = 0;

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const fields2 = {
        "profileID": searchParams.get("profileID"),
    };
    const fields = SanitizeMap(fields2)

    try {
        const emptyField = findEmptyField(fields)
        if (emptyField !== "") {
            return NextResponse.json({ error: `Error: field '${emptyField}' is missing` }, { status: 400 });
        }

        const fetchResponse = await fetchData(fields["profileID"]);
        return NextResponse.json({ response: "success" }, { status: 200 });
    } catch (error) {
        return handleErrorResponse(error);
    }
}

async function fetchData(profileID) {
    const sqlResponse = await sql`
        UPDATE profiles
        SET views = views + 1
        WHERE ProfileID = ${profileID};
    `;
    return sqlResponse;
}

function handleErrorResponse(error) {
    console.error('Error fetching profiles:', error);
    const errorMessage = error.message || "An unexpected error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
}
