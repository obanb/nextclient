import React from 'react';

export const Figure = () => {
  const handleClick = () => {
    console.log('figure CLICK')
  }
  return <div onClick={handleClick} style={{ width: 35, height: 35 }} className={styles.body}></div>;
};

const styles = {
  body: 'border-2 border-gray-600 float-left bg-yellow-500',
};
