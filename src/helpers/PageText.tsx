import React from 'react';

interface TextProps {
  children: React.ReactNode;
  className?: string;
  textDecoration?: string;
  fontWeight?: string;
  fontSize?: string;
  cursor?: string;
}

function PageText({ children, className }: TextProps) {
  return <span className={className}>{children}</span>;
}

export default PageText;
