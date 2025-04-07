import React from 'react';
import { NavigationBar } from './NavigationBar'; // Adjusted the path
import { Footer } from './Footer'; // Adjusted the path

interface SharedLayoutProps {
  children: React.ReactNode;
}

const SharedLayout: React.FC<SharedLayoutProps> = ({ children }) => {
  return (
    <div>
      {/* Navigation Bar */}
      <NavigationBar />

      {/* Main Content */}
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default SharedLayout;
