import { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

export function DataProvider({ children }) {
  const API_URL = import.meta.env.DEV ? 'http://localhost:3001/api' : '/api';

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [orders, setOrders] = useState([]);
  
  const defaultInvoiceSettings = {
    companyName: 'SRI KALIESWAARI CRACKERS',
    address: 'Sivakasi, Tamil Nadu, India',
    phone: '+91 63801 16372',
    email: 'harishponraj901@gmail.com',
    terms: [
      '1. All sales are final. No returns or exchanges.',
      '2. Price is subject to change without prior notice.',
      '3. Subject to Sivakasi Jurisdiction.'
    ]
  };
  const [invoiceSettings, setInvoiceSettings] = useState(defaultInvoiceSettings);

  const [saleEndDate, setSaleEndDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 5);
    return d.toISOString();
  });

  // Fetch all data on mount
  useEffect(() => {
    fetch(`${API_URL}/products`).then(res => res.json()).then(setProducts).catch(console.error);
    fetch(`${API_URL}/categories`).then(res => res.json()).then(setCategories).catch(console.error);
    fetch(`${API_URL}/orders`).then(res => res.json()).then(setOrders).catch(console.error);
    fetch(`${API_URL}/settings`).then(res => res.json()).then(data => {
      if (data.invoiceSettings) setInvoiceSettings(data.invoiceSettings);
      if (data.saleEndDate) setSaleEndDate(data.saleEndDate);
    }).catch(console.error);
  }, []);

  const updateSettingsAPI = (key, value) => {
    fetch(`${API_URL}/settings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key, value })
    }).catch(console.error);
  };

  const handleSetSaleEndDate = (date) => {
    setSaleEndDate(date);
    updateSettingsAPI('saleEndDate', date);
  };

  const updateInvoiceSettings = (newSettings) => {
    setInvoiceSettings(newSettings);
    updateSettingsAPI('invoiceSettings', newSettings);
  };

  // Products
  const addProduct = async (product) => {
    const res = await fetch(`${API_URL}/products`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(product)
    });
    const newProduct = await res.json();
    setProducts(prev => [...prev, newProduct]);
  };

  const editProduct = async (id, updatedProduct) => {
    await fetch(`${API_URL}/products/${id}`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(updatedProduct)
    });
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updatedProduct } : p));
  };

  const deleteProduct = async (id) => {
    await fetch(`${API_URL}/products/${id}`, { method: 'DELETE' });
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  // Categories
  const addCategory = async (category) => {
    const res = await fetch(`${API_URL}/categories`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(category)
    });
    const newCategory = await res.json();
    setCategories(prev => [...prev, newCategory]);
  };

  const editCategory = async (id, updatedCategory) => {
    await fetch(`${API_URL}/categories/${id}`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(updatedCategory)
    });
    setCategories(prev => prev.map(c => c.id === id ? { ...c, ...updatedCategory } : c));
  };

  const deleteCategory = async (id) => {
    await fetch(`${API_URL}/categories/${id}`, { method: 'DELETE' });
    setCategories(prev => prev.filter(c => c.id !== id));
  };

  // Orders
  const addOrder = async (order) => {
    await fetch(`${API_URL}/orders`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(order)
    });
    setOrders(prev => [order, ...prev]);
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    await fetch(`${API_URL}/orders/${orderId}/status`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: newStatus })
    });
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  const deleteOrder = async (orderId) => {
    await fetch(`${API_URL}/orders/${orderId}`, { method: 'DELETE' });
    setOrders(prev => prev.filter(o => o.id !== orderId));
  };

  return (
    <DataContext.Provider value={{ 
      products, categories, orders, invoiceSettings,
      addProduct, editProduct, deleteProduct, 
      addCategory, editCategory, deleteCategory,
      addOrder, updateOrderStatus, deleteOrder,
      updateInvoiceSettings,
      saleEndDate, setSaleEndDate: handleSetSaleEndDate
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}
