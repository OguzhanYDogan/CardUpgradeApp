import { useEffect, useState } from 'react';

export default function EnergyBar({ energy, setEnergy }) {
    const [timeLeft, setTimeLeft] = useState(null);
    const [shouldAddEnergy, setShouldAddEnergy] = useState(false);

    useEffect(() => {
        const now = Date.now();
        const storedNextTick = localStorage.getItem('nextEnergyTick');

        let nextTick = storedNextTick ? parseInt(storedNextTick, 10) : now + 120000;

        if (nextTick <= now) {
            nextTick = now + 120000;
            localStorage.setItem('nextEnergyTick', nextTick.toString());
        }

        const initialTimeLeft = Math.ceil((nextTick - now) / 1000);
        setTimeLeft(initialTimeLeft);
    }, []);

    // Sayaç her saniye azalsın
    useEffect(() => {
        if (energy >= 100 || timeLeft === null) return;

        if (timeLeft <= 0) {
            setShouldAddEnergy(true); // energy artırmayı bir sonraki useEffect'e bırak
            return;
        }

        const timer = setTimeout(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [timeLeft, energy]);

    // Enerjiyi güvenli şekilde sadece 1 kere arttır
    useEffect(() => {
        if (!shouldAddEnergy || energy >= 100) return;

        setEnergy(prev => {
            const newEnergy = Math.min(prev + 1, 100);
            localStorage.setItem('energy', newEnergy.toString());

            const nextTick = Date.now() + 120000;
            localStorage.setItem('nextEnergyTick', nextTick.toString());

            return newEnergy;
        });

        setTimeLeft(120);
        setShouldAddEnergy(false); // tekrar tetiklenmesin
    }, [shouldAddEnergy, setEnergy, energy]);

    const minutes = Math.floor((timeLeft ?? 0) / 60);
    const seconds = (timeLeft ?? 0) % 60;

    return (
        <div className="mb-4 mt-8 text-white bg-gray-800 ring-2 ring-pink-500 ring-opacity-50 p-2 px-5 rounded-full flex justify-end items-center relative">
            <span className="absolute -top-6 left-16 text-orange-300 font-extrabold">Enerji</span>
            {energy !== 100 && (
                <span className="absolute -top-6 right-2 text-gray-600">
                    %1 Yenilenmesine Kalan: {minutes}:{seconds.toString().padStart(2, '0')}
                </span>
            )}

            <div className="absolute inset-0 flex items-center p-2">
                <div
                    className="bg-pink-600 h-full rounded-full shadow-inner shadow-white transition-all duration-300"
                    style={{ width: `${energy}%` }}
                ></div>
            </div>

            <img src="/energy.png" className="w-20 absolute -top-8 -left-5 z-10" />
            <span className="font-bold z-10">%{energy}</span>
        </div>
    );
}
