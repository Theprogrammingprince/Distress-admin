import { useState } from 'react';
import Dashboard from './pages/Dashboard';
import ProductEditor from './pages/ProductEditor';
import Orders from './pages/Orders';
import Statistics from './pages/Statistics';
import Reviews from './pages/Reviews';
import Customers from './pages/Customers';
import Transactions from './pages/Transactions';
import ComingSoonPage from './pages/ComingSoonPage';
import './index.css';

function App() {
  const [currentPath, setCurrentPath] = useState('/products');
  const [activeNavItem, setActiveNavItem] = useState('2');

  const handleNavigation = (id: string, path: string) => {
    setActiveNavItem(id);
    setCurrentPath(path);
  };

  const renderPage = () => {
    switch (currentPath) {
      case '/':
        return <Dashboard activeNavItem={activeNavItem} onNavItemClick={handleNavigation} />;
      case '/products':
        return <ProductEditor activeNavItem={activeNavItem} onNavItemClick={handleNavigation} />;
      case '/orders':
        return <Orders activeNavItem={activeNavItem} onNavItemClick={handleNavigation} />;
      case '/statistics':
        return <Statistics activeNavItem={activeNavItem} onNavItemClick={handleNavigation} />;
      case '/reviews':
        return <Reviews activeNavItem={activeNavItem} onNavItemClick={handleNavigation} />;
      case '/customers':
        return <Customers activeNavItem={activeNavItem} onNavItemClick={handleNavigation} />;
      case '/transactions':
        return <Transactions activeNavItem={activeNavItem} onNavItemClick={handleNavigation} />;
      case '/settings':
        return (
          <ComingSoonPage
            activeNavItem={activeNavItem}
            onNavItemClick={handleNavigation}
            title="Settings"
            description="Settings features are coming soon. Configure your application preferences."
          />
        );
      case '/profile':
        return (
          <ComingSoonPage
            activeNavItem={activeNavItem}
            onNavItemClick={handleNavigation}
            title="Profile"
            description="Profile management features are coming soon. Update your personal information."
          />
        );
      default:
        return <ProductEditor activeNavItem={activeNavItem} onNavItemClick={handleNavigation} />;
    }
  };

  return <div className="min-h-screen">{renderPage()}</div>;
}

export default App;
