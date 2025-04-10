// context/UserContext.tsx
import {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useContext,
} from 'react';

interface User {
  email: string;
  privilegeLevel: number;
}

const UserContext = createContext<User | null>(null);

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(
          'https://intex-2-1-backend-brh0g6hbeqhybcb4.eastus-01.azurewebsites.net/pingauth',
          {
            credentials: 'include',
          }
        );
        if (res.ok) {
          const data = await res.json();
          if (data?.email && data?.privilegeLevel !== undefined) {
            setUser({ email: data.email, privilegeLevel: data.privilegeLevel });
          }
        }
      } catch (err) {
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export default UserContext;
