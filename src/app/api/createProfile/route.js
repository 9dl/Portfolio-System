import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import {findEmptyField} from "@/helpers/validators";
import {OwnerKey} from "@/helpers/ownerKey";
import {SanitizeMap} from "@/helpers/sanitize";

export const fetchCache = 'force-no-store';
export const revalidate = 0;

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const fields = {
        "ownerKey": searchParams.get("ownerKey"),
        "profileID": searchParams.get("profileID"),
        "secretKey": searchParams.get("secretKey"),
        "username": searchParams.get("username"),
        "description": searchParams.get("description"),
        "meteor": searchParams.get("meteor") === 'true',
        "signature": searchParams.get("signature"),
        "avatarSrc": searchParams.get("avatarSrc"),
        "bannerSrc": searchParams.get("bannerSrc"),
        "backgroundSrc": searchParams.get("backgroundSrc"),
        "soundtrackTitle": searchParams.get("soundtrackTitle"),
        "soundtrackSrc": searchParams.get("soundtrackSrc"),
        "floatingImageSrc": searchParams.get("floatingImageSrc"),
        "cursor": searchParams.get("cursor"),
        "discord": searchParams.get("discord"),
        "gitHub": searchParams.get("gitHub"),
        "instagram": searchParams.get("instagram"),
        "telegram": searchParams.get("telegram"),
        "epicGames": searchParams.get("epicGames"),
        "youTube": searchParams.get("youTube"),
        "twitch": searchParams.get("twitch"),
        "twitter": searchParams.get("twitter"),
        "steam": searchParams.get("steam"),
        "customLink": searchParams.get("customLink"),
        "customLinkTooltip": searchParams.get("customLinkTooltip"),
        "openInNewTab": searchParams.get("openInNewTab") === 'true'
    };

    try {

        const emptyField = findEmptyField(fields)
        if (emptyField !== "") {
            return NextResponse.json({ error: `Error: field '${emptyField}' is missing` }, { status: 400 });
        }

        if (fields["ownerKey"] !== OwnerKey) {
            return NextResponse.json({ error: `Invalid ownerKey` }, { status: 401 });
        }

        const fetchResponse = await fetchData(fields);
        return NextResponse.json({ response: "success" }, { status: 200 });
    } catch (error) {
        return handleErrorResponse(error);
    }
}

async function fetchData(fields) {
    const sqlResponse = await sql`
        INSERT INTO Profiles (
            ProfileID,
            SecretKey,
            Username,
            Role,
            Description,
            Meteor,
            Signature,
            AvatarSrc,
            BannerSrc,
            BackgroundSrc,
            SoundtrackTitle,
            SoundtrackSrc,
            FloatingImageSrc,
            Discord,
            GitHub,
            Instagram,
            Telegram,
            EpicGames,
            YouTube,
            Twitch,
            Twitter,
            Steam,
            CustomLink,
            CustomLinkTooltip,
            openInNewTab,
            cursor
        ) VALUES (
            ${fields["profileID"]},
            ${fields["secretKey"]},
            ${fields["username"]},
            "BASIC",
            ${fields["description"]},
            ${fields["meteor"]},
            ${fields["signature"]},
            ${fields["avatarSrc"]},
            ${fields["bannerSrc"]},
            ${fields["backgroundSrc"]},
            ${fields["soundtrackTitle"]},
            ${fields["soundtrackSrc"]},
            ${fields["floatingImageSrc"]},
            ${fields["discord"]},
            ${fields["gitHub"]},
            ${fields["instagram"]},
            ${fields["telegram"]},
            ${fields["epicGames"]},
            ${fields["youTube"]},
            ${fields["twitch"]},
            ${fields["twitter"]},
            ${fields["steam"]},
            ${fields["customLink"]},
            ${fields["customLinkTooltip"]},
            ${fields["openInNewTab"]},
            ${fields["cursor"]}
        );
    `;
    return sqlResponse;
}
function handleErrorResponse(error) {
    console.error('Error fetching profiles:', error);
    const errorMessage = error.message || "An unexpected error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
}