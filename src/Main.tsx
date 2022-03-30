import { FC, useState, useEffect } from 'react';
import { getHandRank } from './utils/get-hand-rank';
import { PayoffTable } from './PayoffTable';

// TODO ADD INPUT VALIDATOR

export const Main: FC = () => {
  const [cards, setCards] = useState('');
  const [firstHand, setFirstHand] = useState('');
  const [secondHand, setSecondHand] = useState('');
  const [result, setResult] = useState('');
  const [playerFirstWins, setPlayerFirstWins] = useState(0);
  const [playerSecondWins, setPlayerSecondWins] = useState(0);

  const resetResults = () => {
    setFirstHand('');
    setSecondHand('');
    setResult('');
  };

  const compareValues = (v1: number, v2: number): string => {
    if (v1 > v2) {
      setPlayerFirstWins(playerFirstWins + 1);
      return 'Player 1 WIN';
    } else if (v1 < v2) {
      setPlayerSecondWins(playerSecondWins + 1);
      return 'Player 2 WIN';
    } else {
      return 'DRAW';
    }
  };

  const compareHandsWithSameRank = (h1: number[], h2: number[]): string => {
    if (h1.length === 2 && h2.length === 2) {
      if (h1[0] !== h2[0]) {
        return compareValues(h1[0], h2[0]);
      } else {
        return compareValues(h1[1], h2[1]);
      }
    } else {
      return compareValues(h1[0], h2[0]); 
    }
  };

  const compareHands = (h1: string, h2: string): string  => {
    const d1 = getHandRank(h1);
    const d2 = getHandRank(h2);
    if (d1.rank === d2.rank) {
      return compareHandsWithSameRank(d1.value, d2.value);
    }
    if (d1.rank > d2.rank) {
      setPlayerFirstWins(playerFirstWins + 1);
      return 'Player 1 WIN';
    } else {
      setPlayerSecondWins(playerSecondWins + 1);
      return 'Player 2 WIN';
    }
  };

  useEffect(() => {
    if (cards.trim().length === 29) {
      setFirstHand(cards.trim().slice(0, cards.length / 2));
      setSecondHand(cards.trim().slice(cards.length / 2 + 1));
    } else {
      resetResults();
    }
  }, [cards]);

  useEffect(() => {
    if (firstHand.length && secondHand.length) {
      setResult(compareHands(firstHand, secondHand));
    }  
  /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [firstHand, secondHand]);

  return (
    <>
      <PayoffTable 
        first={playerFirstWins}
        second={playerSecondWins} 
      />
      <input
        placeholder='Enter cards for two hands'
        value={cards}
        onChange={(event) => setCards(event.target.value)}
        style={{ width: 400, height: 30, padding: '5px 10px' }}
      />
      <span style={{ marginTop: '20px' }}>{result}</span>
    </>
  );
};