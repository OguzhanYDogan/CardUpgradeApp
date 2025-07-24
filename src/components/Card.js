'use client';
import { useState } from 'react';

export default function Card({ card, onUpgrade, onLevelUp }) {
    const [count, setCount] = useState(0);

    const handleCountChange = (val) => {
        const maxUpgradeCount = Math.ceil((100 - card.progress) / 2);
        const newCount = Math.max(1, Math.min(val, maxUpgradeCount));
        setCount(newCount);
    };

    const calculatedProgress = Math.min(card.progress + count * 2, 100);
    const isMaxLevel = card.level === 3 && card.progress === 100;

    return (
        <div className="bg-[#1c1c24] rounded-2xl overflow-hidden shadow-md shadow-gray-300">
            <div className="relative">
                <img src={card.image} alt={card.name} className="w-full h-full aspect-square object-cover" />
                <span className="absolute top-2 right-2 bg-black/60 text-white text-md font-semibold px-2 py-1 rounded">
                    Seviye {card.level}
                </span>

                <div className="p-4 absolute bottom-0 left-0 w-full">
                    <h3 className="text-white font-semibold text-lg">{card.name}</h3>
                    <p className="text-gray-300 text-sm mb-3">{card.description}</p>

                    {/* Progress bar */}
                    <div className="relative bg-pink-900 h-7 overflow-hidden shadow-lg shadow-pink-500/50 p-1 rounded-full mb-2">
                        {/* Mevcut progress */}
                        <div
                            className="absolute left-0 top-0 bottom-0 bg-pink-500 rounded-full transition-all duration-300 z-10"
                            style={{ width: `${card.progress}%` }}
                        ></div>

                        {/* Eklenmek üzere olan (yeşil) progress */}
                        <div
                            className="absolute left-0 top-0 bottom-0 bg-green-400 rounded-full transition-all duration-300 opacity-90"
                            style={{
                                width: `${Math.min(card.progress + count * 2, 100)}%`,
                            }}
                        ></div>

                        {/* Yüzde yazısı */}
                        <span className="relative z-10 flex items-center justify-center h-full text-sm text-white font-semibold">
                            %{Math.min(card.progress + count * 2, 100)}
                        </span>
                    </div>


                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 items-center">
                        {/* Sayı Seçici */}
                        <div className="flex items-center gap-1">
                            <button
                                onClick={() => setCount((prev) => Math.max(0, prev - 1))}
                                className="bg-red-600 text-white px-4 rounded-full text-lg"
                            >
                                -
                            </button>
                            <input
                                type="number"
                                value={count}
                                onChange={(e) => handleCountChange(Number(e.target.value))}
                                className="w-12 text-center rounded bg-gray-200 text-black font-bold"
                                min={0}
                            />
                            <button
                                onClick={() => handleCountChange(count + 1)}
                                className="bg-green-600 text-white px-4 rounded-full text-lg disabled:opacity-40"
                                disabled={card.progress + (count + 1) * 2 > 100}
                            >
                                +
                            </button>
                        </div>
                        <button
                            onClick={() => {
                                if (card.progress >= 100) {
                                    onLevelUp(card.id);
                                } else {
                                    onUpgrade(card.id, count);
                                }
                                setCount(0);
                            }}
                            className={`${card.progress < 100 ? 'bg-orange-300 hover:bg-orange-400 text-black' : 'bg-pink-500 hover:bg-pink-600 text-white'} font-semibold py-1 rounded-full shadow-inner shadow-white`}
                            disabled={isMaxLevel}
                        >
                            {card.progress < 100 ? (
                                <div className="flex gap-1 justify-center items-center">
                                    <img src="/energy.png" className="w-5" />
                                    <span className="text-red-500">- {count}</span>
                                    <span>Geliştir</span>
                                </div>
                            ) : (
                                <span className="mx-auto">{isMaxLevel ? 'Maksimum Seviye' : 'Yükselt'}</span>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
