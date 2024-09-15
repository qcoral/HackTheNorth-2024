import React, { useState, useEffect } from 'react';

const Timer = ({ teamCount }) => {
    const [time, setTime] = useState(0);
    const [isActive, setIsActive] = useState(true);

    useEffect(() => {
        let interval = null;
        if (isActive) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 10);
            }, 10);
        } else if (!isActive && time !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, time]);

    useEffect(() => {
        if (teamCount >= 3) {
            setIsActive(false);
        }
    }, [teamCount]);

    const formatTime = (time) => {
        const getMilliseconds = `0${(time % 1000) / 10}`.slice(-2);
        const seconds = Math.floor((time / 1000) % 60);
        const minutes = Math.floor((time / 60000) % 60);
        const getSeconds = `0${seconds}`.slice(-2);
        const getMinutes = `0${minutes}`.slice(-2);
        return `${getMinutes}:${getSeconds}:${getMilliseconds}`;
    };

    return (
        <div>
            <h1>{formatTime(time)}</h1>
        </div>
    );
};

export default Timer;