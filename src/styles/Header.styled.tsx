import styled from 'styled-components';

import ItemWrapper from '../helpers/ItemWrapper';
import PlayNewGameButton from '../helpers/PlayNewGameButton';

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Wrapper = styled(ItemWrapper)`
  display: flex;
  flex-direction: ${(props) =>
    props.flexDirection ? props.flexDirection : 'row'};
  gap: ${(props) => (props.gap ? props.gap : '0')}rem;
`;

export const Logo = styled.div`
  font-size: 5rem;
  font-weight: 500;
`;

export const Intro = styled.p`
  font-size: 1.1rem;
`;

export const Score = styled.div`
  position: relative;
  display: block;
  font-weight: bold;
  height: 3.3rem;
  padding: 1rem 2rem;
  background-color: #be3a25;
  color: #fff;
  font-size: 1.3rem;
  border-radius: 4px;
  line-height: 2.3rem;

  &::before {
    content: 'Score';
    position: absolute;
    font-size: 0.8rem;
    top: 16%;
    line-height: 1;
    left: 50%;
    transform: translate(-50%);
  }
`;
export const BestScore = styled(Score)`
  &::before {
    content: 'Best';
    left: 50%;
    transform: translate(-50%);
  }
`;
export const NewGameButton = styled(PlayNewGameButton)`
  align-self: flex-end;
  border: none;
  padding: 0.6rem 1rem;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  background-color: #359962;
  color: #fff;
  transition: all 0.3s ease-out;
  &:hover {
    opacity: 0.8;
  }
  &:active {
    transform: scale(0.96);
  }
`;
