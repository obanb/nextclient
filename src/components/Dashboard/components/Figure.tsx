import React from 'react';
import { useTarget } from './hooks/useTarget';

interface FigureProps {
  uniqueId: number,
  type: string,
  name: string,
  desc: string,
  attrs: {
    units: number,
    attack: number,
    armor: number
  }
  control: {
    control: boolean,
    movable: boolean,
  }
}

export const Figure = (props: FigureProps) => {
  const [isTargeted, onTarget] = useTarget();

  const handleClick = () => {
    console.log(props.uniqueId)
    onTarget();
  };
  return <div onClick={handleClick} style={vanillaStyles.body} className={styles.body}></div>;
};





/**
 * Figure styles
 * tailwind
 * vanilla
 */

const styles = {
  body: 'border-2 border-gray-600 bg-yellow-500 z-20',
};

const vanillaStyles = {
  body: {
    width: 35,
    height: 35
  }
}
