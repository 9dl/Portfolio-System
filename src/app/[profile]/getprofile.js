"use server";

import {sql} from "@vercel/postgres";

export async function getUserData(profile) {
    const sqlResponse = await sql`
    SELECT Profileid,
        Username,
        Role,
        Description,
        Meteor,
        Signature,
        Avatarsrc,
        Bannersrc,
        Backgroundsrc,
        Soundtracktitle,
        Soundtracksrc,
        Floatingimagesrc,
        Discord,
        Github,
        Instagram,
        Telegram,
        Epicgames,
        Youtube,
        Twitch,
        Twitter,
        Steam,
        Customlink,
        Customlinktooltip,
        Views,
        Socialspressed,
        Openinnewtab,
        Floatingimage,
        Cursor
    FROM Profiles 
    WHERE ProfileID = ${profile};
`;
    return sqlResponse.rows;
}