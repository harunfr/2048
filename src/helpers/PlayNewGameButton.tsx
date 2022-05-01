import React from 'react';

interface TextProps {
  children: React.ReactNode;
  className?: string;
  playHandler: React.MouseEventHandler;
}

function PlayNewGameButton({ children, className, playHandler }: TextProps) {
  return (
    <div onClick={playHandler} className={className}>
      {children}
    </div>
  );
}

export default PlayNewGameButton;
