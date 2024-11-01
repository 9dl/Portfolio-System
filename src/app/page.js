"use client";
import { useRouter } from "next/navigation";
import { Button, Image, Link } from "@nextui-org/react";
import Tilt from "react-parallax-tilt";
import { useEffect, useState } from "react";
import { Navigation } from "@/components/ui/Navigation";

export default function HomePage() {
    return (
        <>
            <Navigation/>
            <div
                className="absolute inset-0 -z-10 bg-[image:radial-gradient(80%_50%_at_50%_-20%,hsl(var(--secondary)),rgba(255,255,255,0))]"/>
            <Hero />
            <Section1 />
        </>
    );
}

function Hero() {
    return (
        <div className="flex min-h-screen flex-col justify-center text-center items-center gap-2 p-3 select-none">
            <Link href="https://terrorist.wiki/securebyte">
                <Image isBlurred isZoomed width={800} src="/img.png" alt="Chess"/>
            </Link>
            <p className="text-4xl md:text-6xl font-extrabold">
                Best
                <span className="mx-3 underline textShadow">Portfolio</span>
                Provider
            </p>
            <p className="text-white/60 text-xl">
                Minimalistic, Abstract, Beautiful
            </p>
            <Button color="default" variant="faded" as={Link} href="#" radius={"sm"}>
                Apply for a
                <span className="-mx-0.5 underline textShadow font-bold">Free Portfolio</span>
            </Button>
        </div>
    )
}

function Section1() {
    const [socialsViews, setSocialsViews] = useState("Loading...");
    const [viewsCount, setViewsCount] = useState("Loading...");
    const [profilesCount, setProfilesCount] = useState("Loading...");
    const [topUser, setTopUser] = useState("Loading...");

    useEffect(() => {
        const fetchData = async (apiPath, setter) => {
            const response = await fetch(apiPath);
            const data = await response.json();
            setter(data.response);
        };

        fetchData(`api/getSocialsViewsCount`, setSocialsViews);
        fetchData(`api/getViewsCount`, setViewsCount);
        fetchData(`api/getProfilesCount`, setProfilesCount);
        fetchData(`api/getTopUser`, setTopUser);
    }, []);
    return (
        <div className={`flex my-3 flex-col justify-center text-center items-center gap-2 select-none`}>
            <div className="flex flex-col md:flex-row gap-2 w-full justify-center items-center">
                <Card title="Total SM Views" description={socialsViews}/>
                <Card title="Total Profile Views" description={viewsCount}/>
                <Card title="Total Profiles" description={profilesCount}/>
                <Link href={topUser}>
                    <Card title="#1 Viewed User" description={topUser.toUpperCase()}/>
                </Link>
            </div>
        </div>
    )
}

function Card({title, description}) {
    return (
        <Tilt
            tiltMaxAngleX={2.5}
            tiltMaxAngleY={5}
            glareEnable
            tiltAngleYInitial={0}
            glareMaxOpacity={0.1}
            className="fix-safari-tilt relative overflow-hidden rounded-2xl bg-gradient-to-b p-px from-zinc-700 via-zinc-800 to-darker select-none w-72"
        >
            <div className="relative flex flex-col gap-1 rounded-2xl p-8 bg-zinc-900/60 h-full w-full">
            <h4 className="text-2xl font-semibold text-white">{title}</h4>
                <p className="mt-3 text-2xl text-zinc-400">{description}</p>
            </div>
        </Tilt>
    );
}