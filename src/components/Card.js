export default function Card({ card, onUpgrade, onLevelUp }) {
    return (
        <div className="bg-[#1c1c24] rounded-2xl overflow-hidden shadow-md shadow-gray-300">
            <div className="relative">
                <img
                    src={card.image}
                    alt={card.name}
                    className="w-full object-cover"
                />
                <span className="absolute top-2 right-2 bg-black/60 text-white text-md font-semibold px-2 py-1 rounded">
                    Seviye {card.level}
                </span>
                <div className="p-4 absolute bottom-0 left-0 w-full">
                    <h3 className="text-white font-semibold text-lg">{card.name}</h3>
                    <p className="text-gray-300 text-sm mb-3">{card.description}</p>
                    <div className="grid grid-flow-col grid-cols-2 items-center gap-2">
                        <div className="relative bg-pink-900 h-7 overflow-hidden shadow-lg shadow-pink-500/50 p-1 rounded-full">
                            <div
                                className="bg-pink-500 h-full shadow-inner shadow-white rounded-full transition-all duration-300"
                                style={{ width: `${card.progress}%` }}
                            ></div>
                            <span className="absolute inset-0 flex items-center justify-center text-s text-white">
                                %{card.progress}
                            </span>
                        </div>
                        <button
                            onClick={() => {
                                if (card.progress >= 100) {
                                    onLevelUp(card.id);
                                } else {
                                    onUpgrade(card.id);
                                }
                            }}
                            className={`${card.progress < 100 ? 'bg-orange-300 hover:bg-orange-400 text-black' : 'bg-pink-500 hover:bg-pink-600 text-white'} font-semibold py-1 rounded-full shadow-inner shadow-white`}
                            disabled={card.level == 3 && card.progress == 100}
                        >
                            {card.progress < 100 ?
                                <div className="flex gap-1 justify-center">
                                    <img src="/energy.png" className="w-5" /><span className="text-red-500">- 1</span><span>Geliştir</span>
                                </div>
                                :
                                <span className="mx-auto">{card.level == 3 ? 'Maksimum Seviye' : 'Yükselt'}</span>
                            }
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
