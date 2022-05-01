import React from 'react';

interface TextProps {
  children: React.ReactNode;
  className?: string;
  clickHandler: React.MouseEventHandler;
}

function PlayGameButton({ children, className, clickHandler }: TextProps) {
  return (
    <button type="button" onClick={clickHandler} className={className}>
      {children}
    </button>
  );
}

export default PlayGameButton;
