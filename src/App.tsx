import React, { useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import GameBoard from './GameElements/GameBoard';
import Block from './styles/Block.styled';
import GlobalStyle from './styles/global';
import {
  MainContainer,
  GridWrapper,
  GridContainer,
  MainWrapper,
  Text,
  Bottom,
  ReplayButton,
  PlayIcon,
} from './styles/App.styled';

import {
  Header,
  Wrapper,
  Logo,
  Intro,
  Score,
  BestScore,
  NewGameButton,
} from './styles/Header.styled';

interface BlockState {
  number: number;
  move: string;
  isMerged: boolean;
  prev: number;
}

const convertedToState = (grid: number[][]): BlockState[][] =>
  grid.map((row) =>
    row.map((number) => ({
      number,
      move: '',
      isMerged: false,
      prev: 0,
    })));

function App() {
  const gameBoard = useRef(new GameBoard());
  const playDirection = useRef('');

  const [gridAsState, setGridAsState] = useState(
    convertedToState(gameBoard.current.grid).slice(0),
  );
  const [isGameEnded, setIsGameEnded] = useState(false);

  const [score, setScore] = useState(2);
  const [bestScore, setBestScore] = useState(2);

  const handleKeyDown = (event: {
    key: string;
    preventDefault: () => void;
  }) => {
    if (gameBoard.current.isGameEnded === true) {
      setIsGameEnded(true);
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      playDirection.current = 'L';
      gameBoard.current.playLeft();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      playDirection.current = 'R';
      gameBoard.current.playRight();
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      playDirection.current = 'U';
      gameBoard.current.playUp();
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      playDirection.current = 'D';
      gameBoard.current.playDown();
    } else {
      return;
    }

    const state: BlockState[][] = convertedToState(
      gameBoard.current.grid.slice(0),
    ).map((row, rowIndex) =>
      row.map((block, blockIndex) => {
        const prevNumber: number = gridAsState[rowIndex][blockIndex].number;
        const currentNumber: number = block.number;
        if (prevNumber !== 0 && prevNumber !== currentNumber) {
          if (currentNumber === 0) {
            block.move = playDirection.current;
            block.prev = prevNumber;
          } else if (currentNumber === prevNumber * 2) {
            block.isMerged = true;
          }
        }
        return block;
      }));
    const highestNumber: number = gameBoard.current.grid.reduce(
      (biggestNumber, row) => {
        const biggestNumberInRow: number = Math.max(...row);
        if (biggestNumberInRow > biggestNumber) {
          biggestNumber = biggestNumberInRow;
        }
        return biggestNumber;
      },
      0,
    );

    if (highestNumber > score) {
      setScore(highestNumber);
      if (highestNumber > bestScore) {
        setBestScore(highestNumber);
      }
    }

    setGridAsState(state);
  };
  const handleReplay = () => {
    gameBoard.current = new GameBoard();
    setScore(2);
    setIsGameEnded(false);
    setGridAsState(convertedToState(gameBoard.current.grid));
  };
  // react-way of doing this is using useEffect with dependency array.
  document.onkeydown = handleKeyDown;

  return (
    <>
      <GlobalStyle />
      <MainWrapper id="main">
        <MainContainer>
          <Header>
            <Wrapper flexDirection="column">
              <Logo>2048</Logo>
              <Wrapper flexDirection="column" gap="0.5">
                <Intro>
                  Merge the tiles, get to
                  {' '}
                  <Text fontWeight="Bold">2048</Text>
                  !
                </Intro>
              </Wrapper>
            </Wrapper>
            <Wrapper flexDirection="column" gap="2">
              <Wrapper gap="0.7">
                <Score>{score}</Score>
                <BestScore>{bestScore}</BestScore>
              </Wrapper>
              <NewGameButton playHandler={handleReplay}>New Game</NewGameButton>
            </Wrapper>
          </Header>

          <GridWrapper>
            <GridContainer className="app-container" tabIndex={0}>
              {isGameEnded && (
                <ReplayButton clickHandler={() => handleReplay()}>
                  <PlayIcon />
                </ReplayButton>
              )}
              {gridAsState.map((row) =>
                row.map(({
                  move, isMerged, prev, number,
                }) => (
                  <Block
                    move={move}
                    isMerged={isMerged}
                    prev={prev}
                    key={uuidv4()}
                    number={number}
                  />
                )))}
            </GridContainer>
          </GridWrapper>

          <Bottom id="how-to">
            <Text fontWeight="600">HOW TO PLAY</Text>
            : Use your
            {' '}
            <Text fontSize="1.1" fontWeight="600">
              arrow keys
            </Text>
            {' '}
            to move the tiles. Tiles with the same number merge into one when
            they touch. Add them up to reach
            {' '}
            <Text fontSize="1.2" fontWeight="600">
              2048
            </Text>
            !
          </Bottom>
        </MainContainer>
      </MainWrapper>
    </>
  );
}

export default App;
