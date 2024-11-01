"use server"
import { headers } from 'next/headers'
export async function GetIP() {
    return headers().get("x-forwarded-for")
}