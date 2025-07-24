const cards = [
    {
        id: 1,
        baseName: 'sword',
        level: 1,
        progress: 0
    },
    {
        id: 2,
        baseName: 'axe',
        level: 1,
        progress: 0
    },
    {
        id: 3,
        baseName: 'staff',
        level: 1,
        progress: 0
    },
    {
        id: 4,
        baseName: 'shield',
        level: 1,
        progress: 0
    },
    {
        id: 5,
        baseName: 'warhammer',
        level: 1,
        progress: 0
    },
    {
        id: 6,
        baseName: 'scimitar',
        level: 1,
        progress: 0
    },
    {
        id: 7,
        baseName: 'shortsword',
        level: 1,
        progress: 0
    },
    {
        id: 8,
        baseName: 'spellbook',
        level: 1,
        progress: 0
    }
];

export default cards;

export function updateCard(id, updatedData) {
    const index = cards.findIndex((c) => c.id === id);
    if (index !== -1) {
        cards[index] = { ...cards[index], ...updatedData };
        return cards[index];
    }
    return null;
}