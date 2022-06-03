import React from 'react';
import styled, { keyframes } from 'styled-components';

const moveTo = (move: string | undefined) => {
  let y = 0;
  let x = 0;
  if (move === 'L') {
    y = 0;
    x = -100;
  } else if (move === 'R') {
    y = 0;
    x = 100;
  } else if (move === 'U') {
    y = -100;
    x = 0;
  } else if (move === 'D') {
    y = 100;
    x = 0;
  }

  return keyframes`
    0% {
        opacity: 0.8;
        transform : translate(0)
    }
    100% {
        opacity: 0;
        transform : translate(${x}%, ${y}%)
    }
`;
};

const merge = keyframes`
  from {
    opacity: 1;
    transform: scale(1);
  }

  to {
    opacity: 0;
    transform: scale(1.5);
  }
`;

//

interface BlockProps {
  number?: number;
  move: string;
  isMerged: boolean;
  prev: number;
}

const StyledBlock = styled.div<BlockProps>`
  position: relative;
  /* padding: 5px 15px; */
  text-align: center;
  /* background-color: ; */
  background-color: ${(props) =>
    props.number === 4
      ? '#ede0c8'
      : props.number === 8
      ? '#f2b179'
      : props.number === 16
      ? '#f59563'
      : props.number === 32
      ? '#f67c5f'
      : props.number === 64
      ? '#f65e3b'
      : props.number === 128
      ? '#edcf72'
      : props.number === 256
      ? '#edcc61'
      : props.number === 512
      ? '#edc850'
      : props.number === 1024
      ? '#edc53f'
      : props.number === 2048
      ? '#3c3a32'
      : '#d6d438'};

  border-radius: 3px;
  font-size: 55px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;

  &::before {
    display: ${(props) => (props.move || props.isMerged ? 'block' : 'none')};
    color: #bb2b2b;
    background-color: rgb(214, 177, 56);
    content: '${(props) => props.prev}';

    animation: ${(props) =>
        props.move ? moveTo(props.move) : props.isMerged ? merge : 'a'}
      620ms ease-out 1 forwards;

    position: absolute;
    line-height: 110px;
    transition: transform 1s;
    height: 100%;
    width: 100%;
    border-radius: 3px;

    /* z-index: -1; */
  }
`;

function Block({ move, isMerged, prev, number }: BlockProps) {
  return (
    <StyledBlock move={move} isMerged={isMerged} prev={prev} number={number}>
      {number || null}
    </StyledBlock>
  );
}

export default Block;
