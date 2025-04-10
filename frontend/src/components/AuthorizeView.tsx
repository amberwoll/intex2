import React, { useState, useEffect, createContext, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

const UserContext = createContext<User | null>(null);

interface User {
  email: string;
  privilegeLevel: number; // Include privilege level in the user model
}

interface AuthorizeViewProps {
  children: ReactNode;
  requiredPrivilegeLevel: number; // Add this to specify required privilege level
}

function AuthorizeView({
  children,
  requiredPrivilegeLevel,
}: AuthorizeViewProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch('https://localhost:5500/pingauth', {
          method: 'GET',
          credentials: 'include',
        });
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Invalid response format from server');
        }
        const data = await response.json();
        if (data.email && data.privilegeLevel !== undefined) {
          setUser({ email: data.email, privilegeLevel: data.privilegeLevel });
        } else {
          throw new Error('Invalid user session');
        }
      } catch (error) {
        setUser(null); // Set user to null if there's an error
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }
  console.log(
    'user',
    user?.privilegeLevel,
    user?.email,
    'required',
    requiredPrivilegeLevel
  );
  if (!user || user.privilegeLevel < requiredPrivilegeLevel) {
    console.log("i'm in a bad spot");
    return <Navigate to="/login" />;
  }

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export default AuthorizeView;
