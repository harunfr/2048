import React from 'react';

interface NavProps {
  children: React.ReactNode;
  className?: string;
  directHandler: React.MouseEventHandler;
}

function Nav({ children, className, directHandler }: NavProps) {
  return (
    <nav onClick={directHandler} className={className}>
      {children}
    </nav>
  );
}

export default Nav;
