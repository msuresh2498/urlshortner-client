import React, { useEffect } from 'react';
import { createContext, useState } from 'react';


export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        // Store the user information in local storage whenever it changes
        localStorage.setItem('user', JSON.stringify(user));
        console.log(user);
    }, [user]);

    useEffect(() => {
        // Retrieve the user information from local storage on component mount
        const storedUser = localStorage.getItem('user');

        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);



    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};