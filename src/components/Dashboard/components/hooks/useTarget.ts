import { useState } from 'react';

export type useTarget = () => [boolean, () => void];

export const useTarget: useTarget = () => {
  const [isTargeted, setShowIsTargeted] = useState(false);

  const onTarget = () => {
    console.log(isTargeted ? 'already targeted' : 'new target');
    setShowIsTargeted(isTargeted ? false : true);
  };

  return [isTargeted, onTarget];
};
