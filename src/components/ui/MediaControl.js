"use client";
import React, {useEffect, useState} from 'react';
import { Slider } from '@nextui-org/react';
import {Icon} from "@iconify/react";

const MediaControl = ({ videoRef }) => {
    const [isPlaying, setIsPlaying] = useState(true);
    const [seekValue, setSeekValue] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            if (videoRef.current) {
                setCurrentTime(videoRef.current.currentTime);
                const seekPercentage = (videoRef.current.currentTime / videoRef.current.duration) * 100;
                setSeekValue(seekPercentage);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [videoRef]);

    const togglePlayPause = () => {
        if (isPlaying) {
            videoRef.current.pause();
        } else {
            videoRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = Math.floor(timeInSeconds % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const handleSeekChange = (newValue) => {
        const videoDuration = videoRef.current.duration;
        const seekTime = (newValue / 100) * videoDuration;
        videoRef.current.currentTime = seekTime;
        setSeekValue(newValue);
    };

    return (
        <div className="media-control w-full flex flex-row items-center gap-1" aria-label="Media Controls">
            <Icon
                icon={isPlaying ? "solar:pause-circle-bold-duotone" : "solar:play-circle-bold-duotone"}
                onClick={togglePlayPause}
                height={24}
                aria-label={isPlaying ? "Pause Video" : "Play Video"}
            />
            <div className="time-display"
                 aria-label={`Current time: ${formatTime(currentTime)}`}>{formatTime(currentTime)}</div>
            <Slider size="sm" value={seekValue} onChange={handleSeekChange} aria-label="Video Seek Control"/>
        </div>
    );
};

export default MediaControl;
