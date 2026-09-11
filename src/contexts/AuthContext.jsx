import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const API_URL = import.meta.env.DEV ? 'http://localhost:3001/api' : '/api';

  // Initialize from localStorage on load
  useEffect(() => {
    const savedSession = localStorage.getItem('app_currentUser');
    if (savedSession) {
      setCurrentUser(JSON.parse(savedSession));
    }
    
    // Fetch users from DB
    fetch(`${API_URL}/users`)
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error("Error fetching users:", err));
  }, []);



  const signup = async (name, email, password) => {
    if (users.find(u => u.email === email)) {
      throw new Error('An account with this email already exists.');
    }

    const newUser = { id: Date.now().toString(), name, email, password };
    
    try {
      await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
      });
      setUsers(prev => [...prev, newUser]);
      setCurrentUser(newUser);
      localStorage.setItem('app_currentUser', JSON.stringify(newUser));
    } catch (err) {
      throw new Error('Failed to create account.');
    }
  };

  const login = (email, password) => {
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      throw new Error('Invalid email or password.');
    }

    setCurrentUser(user);
    localStorage.setItem('app_currentUser', JSON.stringify(user));
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('app_currentUser');
  };

  const updateUser = async (id, updatedData) => {
    try {
      await fetch(`${API_URL}/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
      });
      setUsers(prev => prev.map(u => u.id === id ? { ...u, ...updatedData } : u));
      if (currentUser?.id === id) {
        const newCurrent = { ...currentUser, ...updatedData };
        setCurrentUser(newCurrent);
        localStorage.setItem('app_currentUser', JSON.stringify(newCurrent));
      }
    } catch (err) {
      console.error("Failed to update user");
    }
  };

  const deleteUser = async (id) => {
    try {
      await fetch(`${API_URL}/users/${id}`, { method: 'DELETE' });
      setUsers(prev => prev.filter(u => u.id !== id));
      if (currentUser?.id === id) {
        logout();
      }
    } catch (err) {
      console.error("Failed to delete user");
    }
  };

  return (
    <AuthContext.Provider value={{ users, currentUser, login, signup, logout, updateUser, deleteUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
