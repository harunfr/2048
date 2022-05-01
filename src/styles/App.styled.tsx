import styled, { keyframes } from 'styled-components';

import { MdReplayCircleFilled } from 'react-icons/md';
import PageText from '../helpers/PageText';
import PlayGameButton from '../helpers/PlayGameButton';
import Nav from '../helpers/Nav';

const fadein = keyframes`
  from {
    opacity: 0
  }

  to {
    opacity: 1;
  }
`;

export const MainWrapper = styled.div``;

export const MainContainer = styled.div`
  display: grid;
  row-gap: 20px;
  width: 460px;
  margin: 0 auto;
`;

export const GridWrapper = styled.div`
  width: 460px;
  height: 460px;
  background-color: rgb(184, 196, 27);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
`;

export const GridContainer = styled.div`
  position: relative;
  margin-top: -8px;
  width: 420px;
  height: 420px;
  display: grid;
  gap: 15px;
  grid-template-columns: repeat(4, 96px);
  grid-template-rows: repeat(4, 96px);
  justify-content: center;
`;

export const Bottom = styled.div`
  font-size: 1.2rem;
  line-height: 1.6;
  padding-bottom: 1rem;
`;

export const Text = styled(PageText)`
  text-decoration: ${(props) =>
    props.textDecoration ? props.textDecoration : ''};
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : '400')};
  font-size: ${(props) => (props.fontSize ? props.fontSize : '1')}rem;
  text-decoration-thickness: 0.12rem;
  cursor: ${(props) => (props.cursor ? props.cursor : 'defaul')};
`;

export const ReplayButton = styled(PlayGameButton)`
  position: absolute;
  margin-left: -5px;
  width: 102.5%;
  height: 102.5%;
  background-color: rgba(238, 228, 218, 0.73);
  border: none;
  z-index: 2;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${fadein} 1s ease 1 forwards;

  &&::before {
    content: 'Game Over!';
    position: absolute;
    top: 10%;
    left: 22%;
    font-size: 3rem;
    font-weight: 500;
  }
`;

export const PlayIcon = styled(MdReplayCircleFilled)`
  font-size: 10rem;
  opacity: 0.7;
  &:hover {
    transform: scale(0.96);
  }
`;

export const Navigator = styled(Nav)`
  font-weight: 700;
  text-decoration: underline;
  cursor: pointer;
`;
