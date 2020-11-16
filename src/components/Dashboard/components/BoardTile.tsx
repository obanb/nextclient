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
      <div className={devStyles.devInfo}>{uniqueId}</div>
      {uniqueId === 1 && <Figure/>}
    </div>
  );
};

const styles = {
  tile: 'border-2 border-gray-600 float-left z-10',
  targeted: 'border-4 border-orange-900 float-left',
};

const devStyles = {
  devInfo: 'z-0 absolute'
}
