import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export const fetchCache = 'force-no-store';
export const revalidate = 0;

export async function GET() {
    try {
        const fetchResponse = await fetchData();
        return NextResponse.json({ response: fetchResponse }, { status: 200 });
    } catch (error) {
        return handleErrorResponse(error);
    }
}

async function fetchData() {
    const sqlResponse = await sql`
        SELECT COUNT(*) AS total_profiles
        FROM profiles;
    `;
    return sqlResponse.rows[0].total_profiles;
}

function handleErrorResponse(error) {
    console.error('Error fetching profiles:', error);
    const errorMessage = error.message || "An unexpected error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
}
