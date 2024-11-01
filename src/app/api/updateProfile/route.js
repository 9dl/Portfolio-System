import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import {findEmptyField} from "@/helpers/validators";
import {OwnerKey} from "@/helpers/ownerKey";
import {excludedKeys} from "@/helpers/fields";
import {Sanitize, SanitizeMap} from "@/helpers/sanitize";

export const fetchCache = 'force-no-store';
export const revalidate = 0;

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const fields2 = {
        "profileID": searchParams.get("profileID"),
        "secretKey": searchParams.get("secretKey"),
        "newValue": searchParams.get("newValue"),
        "field": searchParams.get("field"),
    };
    const fields = SanitizeMap(fields2)


    try {
        const emptyField = findEmptyField(fields)
        if (emptyField !== "") {
            return NextResponse.json({ error: `Error: field '${emptyField}' is missing` }, { status: 400 });
        }

        const fetchResponse = await fetchData(fields["profileID"], fields["field"], fields["newValue"]);
        return NextResponse.json({ response: "success" }, { status: 200 });
    } catch (error) {
        return handleErrorResponse(error);
    }
}

async function fetchData(profileID, field, newValue) {
    const sanitizedField = field.replace(/[^a-zA-Z0-9_]/g, '');

    if (excludedKeys.includes(field)) {
        throw new Error('Invalid field name');
    }


    const sqlQuery = `UPDATE Profiles SET ${sanitizedField} = $1 WHERE ProfileID = $2`;

    const sqlResponse = await sql.query(sqlQuery, [newValue, profileID]);
    return sqlResponse;
}

function handleErrorResponse(error) {
    console.error('Error fetching profiles:', error);
    const errorMessage = error.message || "An unexpected error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
}
