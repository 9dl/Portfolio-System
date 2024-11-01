"use client"
import React, { useState, useEffect } from 'react';
import { Slider } from '@nextui-org/react';
import { Icon } from "@iconify/react";

export default function SoundBar({ videoRef }) {
    const initialVolume = localStorage.getItem('volume') ? parseFloat(localStorage.getItem('volume')) : 0.5;
    const [volume, setVolume] = useState(initialVolume);
    const [isMuted, setIsMuted] = useState(false);

    const handleVolumeChange = (newVolume) => {
        const scaledVolume = newVolume / 100;
        setVolume(scaledVolume);
        localStorage.setItem('volume', scaledVolume.toString()); // Persist volume
    };

    const toggleMute = () => {
        setIsMuted(!isMuted);
    };

    useEffect(() => {
        videoRef.current.volume = volume;
        videoRef.current.muted = isMuted;
    }, [volume, isMuted, videoRef]);

    return (
        <div className="flex sound-bar w-full" aria-label="Sound Controls">
            <Icon
                icon={isMuted ? "solar:volume-off" : "solar:volume-up"}
                onClick={toggleMute}
                aria-label={isMuted ? "Unmute" : "Mute"}
            />
            <Slider
                color="success"
                size="sm"
                startContent={<Icon icon="solar:volume-bold-duotone" height={24}/>}
                endContent={<Icon icon="solar:volume-small-bold" height={24}/>}
                value={volume * 100}
                onChange={handleVolumeChange}
                disabled={isMuted}
                aria-label="Adjust Volume"
            />
        </div>
    );
};
