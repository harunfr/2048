import React from 'react';

interface WrapperProps {
  children: React.ReactNode;
  className?: string;
  gap?: string;
  flexDirection?: string;
}

function ItemWrapper({ children, className }: WrapperProps) {
  return <div className={className}>{children}</div>;
}

export default ItemWrapper;
