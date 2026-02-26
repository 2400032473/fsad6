import { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const roles = {
    ADMIN: 'admin',
    INVESTOR: 'investor',
    ADVISOR: 'advisor',
    ANALYST: 'analyst'
  };

  const login = (email, password, role) => {
    // Mock authentication - in production, validate against backend
    if (email && password && role) {
      const userData = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        role,
        name: email.split('@')[0],
        loginTime: new Date()
      };
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const register = (formData) => {
    // Mock registration - in production, send to backend
    if (formData.email && formData.password && formData.fullName) {
      const userData = {
        id: Math.random().toString(36).substr(2, 9),
        email: formData.email,
        role: formData.role,
        name: formData.fullName,
        phone: formData.phone,
        registrationDate: new Date()
      };
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    isAuthenticated,
    login,
    register,
    logout,
    roles
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
