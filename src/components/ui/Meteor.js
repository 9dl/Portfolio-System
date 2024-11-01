"use client"
import { useState, useEffect, useMemo } from 'react';
import { clsx } from '@nextui-org/shared-utils';

const generateMeteorStyle = () => ({
    top: -100,
    left: `${Math.floor(Math.random() * 150) - 50}vw`,
    animationDelay: `${Math.random() * (0.8 - 0.2) + 0.2}s`,
    animationDuration: `${Math.floor(Math.random() * (50 - 10) + 10)}s`,
});

const FUIMeteor = () => {
    const [meteors, setMeteors] = useState([]);

    useEffect(() => {
        const newMeteors = Array.from({ length: 30 }, () => ({ style: generateMeteorStyle() }));
        setMeteors(newMeteors);
    }, []);

    const meteorElements = useMemo(() => meteors.map((meteor, idx) => (
        <span
            aria-label={idx}
            key={`meteor-${idx}`}
            className={clsx(
                "animate-meteor-effect absolute top-1/2 left-1/2 p-0.5 w-0.5 rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10] rotate-[215deg]",
                "before:content-[''] before:absolute before:top-1/2 before:transform before:-translate-y-[50%] before:w-[50px] before:p-[1px] before:bg-gradient-to-r before:from-[#64748b] before:to-transparent"
            )}
            style={meteor.style}
        />
    )), [meteors]);

    return <>{meteorElements}</>;
};

export { FUIMeteor };