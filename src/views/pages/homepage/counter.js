import React, {useRef, useEffect, useState} from 'react';
let count = 0;
export const Counter = ({ onScrollToMiddle }) => {
  const middleRef = useRef(null);
  useEffect(() => {
    const currentElement = middleRef.current;
    const handleScroll = () => {
      const closestPocketSection = findClosestPocketSection(currentElement);

      if (closestPocketSection) {
        const rect = closestPocketSection.getBoundingClientRect();
        const topPosition = rect.top + window.scrollY;
        let scrollAmount = window.scrollY || window.pageYOffset;
        let checkValue = topPosition > 4500 ? 500 : 300;
        if((topPosition - scrollAmount) < checkValue) {
          // console.log("scrollAmount",scrollAmount)
          // console.log("topPosition",topPosition)
          count = count + 1;
          checkStatusHandler(count)
        }else{
          count = 0;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [onScrollToMiddle]);
  const findClosestPocketSection = (element) => {
    while (element && !element.classList.contains('layer-5-wrapper')) {
      element = element.parentElement;
    }
    return element;
  };
  const checkStatusHandler = (count) => {
    if(count === 1) {
      onScrollToMiddle()
    }
  }
  return <div ref={middleRef}></div>;
};
