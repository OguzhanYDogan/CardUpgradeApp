// components/NavigationBar.js

export default function NavigationBar({ selectedFilter, onFilterChange }) {
    return (
        <ul className="flex flex-wrap my-6 pe-16 text-gray-500 border-4 font-bold border-gray-500 rounded-full justify-between items-center text-center text-xl">
            {[
                { label: 'Tüm Seviyeler', value: 'all' },
                { label: 'Sv 1', value: '1' },
                { label: 'Sv 2', value: '2' },
                { label: 'Max Sv', value: '3' },
            ].map(({ label, value }) => (
                <li key={value} className="me-2">
                    <button
                        onClick={() => onFilterChange(value)}
                        className={`inline-block p-3 m-2 rounded-full ${selectedFilter === value
                                ? 'bg-orange-300 font-extrabold text-black'
                                : 'hover:text-gray-600 hover:bg-gray-50'
                            }`}
                    >
                        {label}
                    </button>
                </li>
            ))}
        </ul>
    );
}
