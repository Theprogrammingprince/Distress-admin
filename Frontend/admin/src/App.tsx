import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './components/layout/AdminLayout';
import Dashboard from './pages/Dashboard';
import Sellers from './pages/Sellers';
import Products from './pages/Products';
import SellerReviews from './pages/reviews/SellerReviews';
import ProductReviews from './pages/reviews/ProductReviews';
import Payments from './pages/Payments';
import Settings from './pages/Settings';
import './index.css';

function App() {
  return (
    <Router>
      <div className="dark min-h-screen bg-background text-foreground">
        <Routes>
          <Route path="/" element={<Navigate to="/admin" replace />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="sellers" element={<Sellers />} />
            <Route path="products" element={<Products />} />
            <Route path="reviews/sellers" element={<SellerReviews />} />
            <Route path="reviews/products" element={<ProductReviews />} />
            <Route path="payments" element={<Payments />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
