import { useState } from 'react';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import ProductEditor from './pages/ProductEditor';
import ProductApprovals from './pages/ProductApprovals';
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
      case '/product-list':
        return <Products activeNavItem={activeNavItem} onNavItemClick={handleNavigation} />;
      case '/product-approvals':
        return <ProductApprovals />;
      case '/orders':
        return (
          <ComingSoonPage
            activeNavItem={activeNavItem}
            onNavItemClick={handleNavigation}
            title="Orders"
            description="Advanced order management features are coming soon. View order details, update statuses, and manage fulfillment."
          />
        );
      case '/statistics':
        return (
          <ComingSoonPage
            activeNavItem={activeNavItem}
            onNavItemClick={handleNavigation}
            title="Statistics"
            description="Statistics and analytics features are coming soon. Track performance metrics and insights."
          />
        );
      case '/reviews':
        return (
          <ComingSoonPage
            activeNavItem={activeNavItem}
            onNavItemClick={handleNavigation}
            title="Reviews"
            description="Review management features are coming soon. Monitor and respond to customer feedback."
          />
        );
      case '/customers':
        return (
          <ComingSoonPage
            activeNavItem={activeNavItem}
            onNavItemClick={handleNavigation}
            title="Customers"
            description="Customer management features are coming soon. View and manage customer information."
          />
        );
      case '/transactions':
        return (
          <ComingSoonPage
            activeNavItem={activeNavItem}
            onNavItemClick={handleNavigation}
            title="Transactions"
            description="Transaction management features are coming soon. Track and manage all transactions."
          />
        );
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
