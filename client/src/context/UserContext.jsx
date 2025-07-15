import { createContext, useState } from 'react';

export const UserContext = createContext();

export function UserProvider({ children }) {
    const [username, setUsername ] = useState('');
        return (
            <UserContext.Provider value={{ username, setUsername }}>
            {children}
            </UserContext.Provider>
        );
}