export interface HandRank {
  rank: number;
  value: number[]; 
}

const ORDER = '23456789TJQKA';

const count = (c: Record<number, number>, a: number): Record<number, number> => {
  c[a] = (c[a] || 0) + 1;
  return c;
};

export const getHandRank = (hand: string): HandRank => {
  const cards = hand.split(' '); // get carts of one hand
  const faces = cards.map(a => ORDER.indexOf(a[0])).sort((a, b) => b - a); // get array of faces weight (from 0 for 2 to 12 for Ace)
  const suits = cards.map(a => a[1]).sort(); // get array of suits
  const uniqueFaces: Record<number, number> = faces.reduce(count, {}); // object where key is cart weight, value - the number of such carts that hand have
  const duplicationLevel: Record<number, number> = Object.values(uniqueFaces).reduce(count, {}); // object where key - number of duplicated carts, value - number of such 'pairs'
  const flush = suits[0] === suits[4]; // all suits are the same
  const straight = faces.every((face, index) => faces[0] - face === index);
  const rank =
    (flush && straight && faces[0] === 12 && 10) || // Royal Flush
    (flush && straight && 9) || // Straight flush
    (duplicationLevel[4] && 8) || // four same
    (duplicationLevel[3] && duplicationLevel[2] && 7) ||  // full house
    (flush && 6) || // flush
    (straight && 5) || // straight
    (duplicationLevel[3] && 4) || // three of a king
    (duplicationLevel[2] > 1 && 3) || // two pairs
    (duplicationLevel[2] && 2) || // pair
    1;
  const getBiggerPairs = (a: number, b: number) => {
    const countDiff = uniqueFaces[b] - uniqueFaces[a];
    if (countDiff) return countDiff;
    return b > a ? -1 : b === a ? 0 : 1;
  }  ;
  return { rank, value: [...new Set(faces.sort(getBiggerPairs))] };
};