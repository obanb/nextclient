import React from 'react';

export const BoardTile = ({ positionY, positionX, uniqueId, config }) => {

  const handleClick = () => {
    console.log(`click on ${uniqueId}`)
  }


  return (
    <div
      onClick={handleClick}
      className={`${styles.tile}`}
      style={{ width: config.tileWidth, height: config.tileHeight }}
    >
      {uniqueId}
    </div>
  );
};

const styles = {
  tile: 'border-2 border-gray-600 float-left',
};