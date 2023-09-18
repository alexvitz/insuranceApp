import React from 'react';
import '../../styles/styles.scss';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return <div className="appBackground">{children}</div>;
};

export default Layout;
