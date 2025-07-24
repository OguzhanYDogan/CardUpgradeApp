'use client';

import { useState, useEffect } from 'react';
import Card from '../components/Card';
import EnergyBar from '../components/EnergyBar';
import NavigationBar from '@/components/NavigationBar';
import { weaponLevels } from '@/app/data/levelData';

export default function HomePage() {
  const [energy, setEnergy] = useState(100);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // 👈 filtre durumu

  useEffect(() => {
    const storedCards = localStorage.getItem('cards');
    const storedEnergy = localStorage.getItem('energy');

    if (storedCards && storedEnergy) {
      setCards(JSON.parse(storedCards));
      setEnergy(Number(storedEnergy));
      setLoading(false);
    } else {
      fetchCardsFromAPI();
    }
  }, []);

  async function fetchCardsFromAPI() {
    try {
      const res = await fetch('/api/cards');
      const data = await res.json();
      setCards(data);
      localStorage.setItem('cards', JSON.stringify(data));
      localStorage.setItem('energy', '100');
    } catch (err) {
      console.error('Kartlar yüklenemedi:', err);
      alert('Kartlar yüklenirken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  }

  const handleUpgrade = async (id, count) => {
    if (energy < count) {
      alert('Yeterli enerjin yok!');
      return;
    }

    const res = await fetch('/api/upgrade', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, count }),
    });

    if (!res.ok) {
      const text = await res.text();
      let error;
      try {
        error = JSON.parse(text);
      } catch {
        error = { message: text || 'Bilinmeyen hata' };
      }
      alert(`Hata: ${error.message}`);
      return;
    }

    setCards((prevCards) => {
      const updatedCards = prevCards.map((card) => {
        if (card.id !== id) return card;
        let newProgress = card.progress + count * 2;
        if (newProgress > 100) newProgress = 100;
        return { ...card, progress: newProgress };
      });
      localStorage.setItem('cards', JSON.stringify(updatedCards));
      return updatedCards;
    });

    setEnergy((prevEnergy) => {
      const newEnergy = Math.max(prevEnergy - count, 0);
      localStorage.setItem('energy', newEnergy.toString());
      return newEnergy;
    });
  };


  const handleLevelUp = (id) => {
    setCards((prevCards) => {
      const updatedCards = prevCards.map((card) => {
        if (card.id !== id) return card;
        if (card.progress < 100) {
          alert('Önce ilerlemeyi %100 yapmalısınız.');
          return card;
        }

        const newLevel = card.level + 1;
        const levelsForWeapon = weaponLevels[card.baseName];
        if (!levelsForWeapon || newLevel > levelsForWeapon.length) {
          alert('Maksimum seviyeye ulaşıldı.');
          return card;
        }

        return {
          ...card,
          level: newLevel,
          progress: 0,
        };
      });
      localStorage.setItem('cards', JSON.stringify(updatedCards));
      return updatedCards;
    });
  };

  const filteredCards = cards.filter((card) => {
    if (filter === 'all') return true;
    if (filter === 'max') {
      const maxLevel = weaponLevels[card.baseName]?.length || 1;
      return card.level === maxLevel;
    }
    return card.level === Number(filter);
  });

  return (
    <div className="min-h-screen p-6">
      <EnergyBar energy={energy} setEnergy={setEnergy} />
      <NavigationBar selectedFilter={filter} onFilterChange={setFilter} />
      {loading && <div className="p-6 text-xl leading-7 text-center">Kartlar yükleniyor...</div>}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {filteredCards.map((card) => {
          const levelInfo = weaponLevels[card.baseName]?.[card.level - 1] || {};
          return (
            <Card
              key={card.id}
              card={{
                ...card,
                name: levelInfo.name || 'Bilinmeyen Silah',
                description: levelInfo.description || '',
                image: levelInfo.image || 'default.png',
                energy,
              }}
              onUpgrade={handleUpgrade}
              onLevelUp={handleLevelUp}
            />
          );
        })}
      </div>
    </div>
  );
}
