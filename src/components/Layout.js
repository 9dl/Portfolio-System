"use client";
import React, { useState, useRef, useEffect } from 'react';
import ProfileCard from '../components/ProfileCard';
import { Divider, Image, Link } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { FUIMeteor } from "@/components/ui/Meteor";
import SoundBar from "@/components/ui/SoundBar";
import MediaControl from "@/components/ui/MediaControl";
import { motion } from "framer-motion";
import AnimatedCursor from "react-animated-cursor";
import CustomCursor from "@/components/ui/CustomCursor";

export function ProfileLayout({ profile }) {
    useEffect(() => {
        const currentProfile = profile.profileid;
        const updateVisitedProfiles = () => {
            const visitedProfiles = JSON.parse(localStorage.getItem('visitedProfiles') || '{}');

            if (!visitedProfiles[currentProfile]) {
                fetch(`api/increaseViews?profileID=${currentProfile}`);
                localStorage.setItem('visitedProfiles', JSON.stringify({
                    ...visitedProfiles,
                    [currentProfile]: true
                }));
            }
        };

        updateVisitedProfiles();
    });


    const [showModal, setShowModal] = useState(true);
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (mounted) document.title = Profile.username;

        return () => {
            setMounted(false);
        };
    }, []);

    const handleModalClick = () => {
        setShowModal(false);
        togglePlayback();
    };

    const togglePlayback = () => {
        setIsPlaying(!isPlaying);
    };

    useEffect(() => {
        const videoElement = videoRef.current;
        if (isPlaying) {
            videoElement.play().catch(error => console.error("Video play failed:", error));
        } else {
            videoElement.pause();
        }

        return () => {
            videoElement.pause();
        };
    }, [isPlaying]);

    const renderFloatingImage = (position, rotation, scale) => {
        return (
            <motion.div
                initial={{ x: position, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 60, damping: 20 }}
            >
                <div className={`transition hidden md:flex absolute top-[330px] ${rotation} float-element`}>
                    <Image className={scale} src={profile.floatingimagesrc} isBlurred width={350} />
                </div>
            </motion.div>
        );
    };

    return (
        <>
            <CustomCursor cursorType={profile.cursor}/>
            <div className="fixed min-h-screen min-w-full">
                {profile.meteor && <FUIMeteor className="absolute w-full h-screen overflow-hidden"/>}
                {showModal && (
                    <motion.div
                        className="fixed flex flex-col z-10 min-w-full min-h-full backdrop-blur-sm text-white justify-center items-center cursor-pointer"
                        initial={{scale: 0.5}}
                        animate={{scale: 1.5}}
                        transition={{type: "spring", stiffness: 100, damping: 10, yoyo: Infinity}}
                        onClick={handleModalClick}
                    >
                        <p className="text-2xl font-extrabold divHoverEffect">
                            [ <span className="textShadow font-extrabold">CLICK ANYWHERE</span> ]
                        </p>
                    </motion.div>
                )}
                <video ref={videoRef} loop
                       style={{width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', zIndex: -1}}>
                    <source src={profile.backgroundsrc} type="video/mp4"/>
                    Your browser does not support the video tag.
                </video>
                {!showModal && (
                    <>
                        <div
                            className="absolute left-2 bottom-1 flex flex-row gap-2 text-sm text-default-500 items-center z-30">
                            <Icon icon="solar:music-note-2-bold-duotone" color="gray"/>
                            <p>Playing:</p>
                            <Link className="text-default-500 text-sm" href={profile.soundtracksrc}>
                                <p className="underline underline-offset-2">{profile.soundtracktitle}</p>
                            </Link>
                        </div>
                        <div
                            className="absolute right-2 bottom-1 flex flex-col w-72 gap-2 text-sm text-default-500 items-center z-30">
                            <SoundBar videoRef={videoRef}/>
                            <Divider/>
                            <MediaControl videoRef={videoRef}/>
                        </div>
                        <div className="absolute p-2 flex flex-row items-center gap-1.5">
                            <Icon icon="solar:eye-bold-duotone" color="gray" width={32}/>
                            <p className="text-default-500/50">{profile.views}</p>
                        </div>
                        {profile.floatingimage && (
                            <>
                                {renderFloatingImage(-100, "left-[20px]", "-rotate-12 hover:rotate-6")}
                                {renderFloatingImage(100, "right-[20px]", "rotate-12 hover:-rotate-[6deg] -scale-x-100")}
                            </>
                        )}
                        <ProfileCard profile={profile}/>
                    </>
                )}
            </div>
        </>
    );
}
