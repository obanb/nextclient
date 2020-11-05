import React from 'react';
import { useTarget } from './hooks/useTarget';
import { Figure } from './Figure';

export const BoardTile = ({
  positionY,
  positionX,
  uniqueId,
  config,
  figure,
}) => {
  const [isTargeted, onTarget] = useTarget();

  const handleClick = () => {
    console.log(`click on ${uniqueId}`);
    onTarget();
  };

  return (
    <div
      onClick={handleClick}
      className={`${isTargeted ? styles.targeted : styles.tile}`}
      style={{ width: config.tileWidth, height: config.tileHeight }}
    >
      {/*{uniqueId}*/}
      {uniqueId === 1 && <Figure/>}
    </div>
  );
};

const styles = {
  tile: 'border-2 border-gray-600 float-left',
  targeted: 'border-4 border-orange-900 float-left',
};
