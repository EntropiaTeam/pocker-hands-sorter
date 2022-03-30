import { FC } from 'react';

interface Props {
  first: number;
  second: number;
}

export const PayoffTable: FC<Props> = ({ first, second }) => (
  <div style={{ display: 'flex', marginBottom: '50px'  }}>
    <div style={{ margin: '0 20px' }}>
      <p style={{ margin: '0 0 20px 0' }}>Player 1</p>
      <div>{first}</div>
    </div>
    <div style={{ margin: '0 20px' }}>
      <p style={{ margin: '0 0 20px 0' }}>Player 2</p>
      <div>{second}</div>
    </div>
  </div>
);