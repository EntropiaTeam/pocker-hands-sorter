import { FC, useState, useEffect } from 'react';
import { getHandRank } from './utils/get-hand-rank';
import { PayoffTable } from './PayoffTable';

// TODO ADD INPUT VALIDATOR

export const Main: FC = () => {
  const [rawCards, setRawCards] = useState('');
  const [playerFirstWins, setPlayerFirstWins] = useState(0);
  const [playerSecondWins, setPlayerSecondWins] = useState(0);

  const isFirstValueBigger = (v1: number, v2: number): boolean | null => {
    if (v1 > v2) {
      return true;
    } else if (v1 < v2) {
      return false;
    } else {
      return null;
    }
  };

  const isFirstHaveHighestCard = (h1: number[], h2: number[]): boolean | null => {
    const uniqueFirstHand = h1.filter(val => !h2.includes(val));
    if (!uniqueFirstHand.length) {
      return null; 
    }
    const uniqueSecondHand = h2.filter(val => !h1.includes(val));
    return uniqueFirstHand[0] > uniqueSecondHand[0];
  };

  const compareHandsWithSameRank = (h1: number[], h2: number[]): boolean | null => {
    if (h1.length === 2 && h2.length === 2) {
      if (h1[0] !== h2[0]) {
        return isFirstValueBigger(h1[0], h2[0]);
      } else {
        return isFirstValueBigger(h1[1], h2[1]);
      }
    } else {
      return isFirstHaveHighestCard(h1, h2); 
    }
  };

  const isFirstPlayerWin = (h1: string, h2: string): boolean | null  => {
    const d1 = getHandRank(h1);
    const d2 = getHandRank(h2);
    if (d1.rank === d2.rank) {
      return compareHandsWithSameRank(d1.value, d2.value);
    }
    if (d1.rank > d2.rank) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    if (rawCards.trim().length > 28) {
      const cardsArray = rawCards.split('\n');
      let playerFirstCount = 0;
      let playerSecondCount = 0;
      cardsArray.forEach((cards) => {
        const firstHand = cards.trim().slice(0, cards.length / 2);
        const secondHand = cards.trim().slice(cards.length / 2 + 1);
        if (isFirstPlayerWin(firstHand, secondHand) === true) {
          playerFirstCount++;
        } else if (isFirstPlayerWin(firstHand, secondHand) === false) {
          playerSecondCount++;
        } 
      });
      setPlayerFirstWins(playerFirstWins + playerFirstCount);
      setPlayerSecondWins(playerSecondWins + playerSecondCount);
    }
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [rawCards]);

  return (
    <>
      <PayoffTable 
        first={playerFirstWins}
        second={playerSecondWins} 
      />
      <span style={{ fontSize: 20, marginBottom: 10 }}>Enter values from txt document or provide only one</span>
      <textarea
        placeholder='Enter cards for two hands'
        value={rawCards}
        onChange={(event) => setRawCards(event.target.value)}
        style={{ width: 400, height: 60, padding: '5px 10px' }}
      />
    </>
  );
};