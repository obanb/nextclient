import React from 'react';
import { useTarget } from './hooks/useTarget';
import { Figure } from './Figure';
import { useBoardDispatchContext } from './state/BoardContext';

const BoardTile = ({
  positionY,
  positionX,
  uniqueId,
  config,
  figure,
  targeted,
}) => {
  const [isTargeted, onTarget] = useTarget();

  const dispatch = useBoardDispatchContext();

  const handleClick = () => {
    dispatch({ type: 'SET_TILE_TARGETED', payload: uniqueId });
    onTarget();
  };

  return (
    <div
      onClick={handleClick}
      className={`${targeted ? styles.targeted : styles.tile}`}
      style={{ width: config.tileWidth, height: config.tileHeight }}
    >
      {console.log('render')}
      <div className={devStyles.devInfo}>{uniqueId}</div>
      {figure && <Figure {...figure} />}
    </div>
  );
};

const styles = {
  tile: 'border border-gray-600 float-left z-10',
  targeted: 'border border-orange-900 float-left bg-green-100',
};

const devStyles = {
  devInfo: 'z-0 absolute',
};

export default React.memo(BoardTile);
