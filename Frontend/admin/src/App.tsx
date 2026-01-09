import { useState } from 'react';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import ProductApprovals from './pages/ProductApprovals';
import ComingSoonPage from './pages/ComingSoonPage';
import './index.css';

function App() {
  const [currentPath, setCurrentPath] = useState('/');
  const [activeNavItem, setActiveNavItem] = useState('1');

  const handleNavigation = (id: string, path: string) => {
    setActiveNavItem(id);
    setCurrentPath(path);
  };

  const renderPage = () => {
    switch (currentPath) {
      case '/':
        return <Dashboard activeNavItem={activeNavItem} onNavItemClick={handleNavigation} />;
      case '/products':
        return <Products activeNavItem={activeNavItem} onNavItemClick={handleNavigation} />;
      case '/product-approvals':
        return <ProductApprovals />;
      case '/payments':
        return (
          <ComingSoonPage
            activeNavItem={activeNavItem}
            onNavItemClick={handleNavigation}
            title="Payments"
            description="Payment management features are coming soon. Track transactions, process refunds, and manage payment methods."
          />
        );
      case '/orders':
        return (
          <ComingSoonPage
            activeNavItem={activeNavItem}
            onNavItemClick={handleNavigation}
            title="Orders"
            description="Advanced order management features are coming soon. View order details, update statuses, and manage fulfillment."
          />
        );
      case '/chat':
        return (
          <ComingSoonPage
            activeNavItem={activeNavItem}
            onNavItemClick={handleNavigation}
            title="Chat"
            description="Live chat support features are coming soon. Communicate with customers in real-time."
          />
        );
      case '/mail':
        return (
          <ComingSoonPage
            activeNavItem={activeNavItem}
            onNavItemClick={handleNavigation}
            title="Mail"
            description="Email management features are coming soon. Send, receive, and organize customer communications."
          />
        );
      case '/calendar':
        return (
          <ComingSoonPage
            activeNavItem={activeNavItem}
            onNavItemClick={handleNavigation}
            title="Calendar"
            description="Calendar and scheduling features are coming soon. Manage appointments, events, and reminders."
          />
        );
      default:
        return <Dashboard activeNavItem={activeNavItem} onNavItemClick={handleNavigation} />;
    }
  };

  return <div className="min-h-screen">{renderPage()}</div>;
}

export default App;
