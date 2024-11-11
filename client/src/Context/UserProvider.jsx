// UserContext.js
import React, { createContext, useState } from "react";

// 1. Create the Context
export const UserContext = createContext();

// 2. Create a Provider Component
export const UserProvider = ({ children }) => {
    const [selectUser, setSelectUser] = useState(null);

    return (
        <UserContext.Provider value={[ selectUser, setSelectUser ]}>
            {children}
        </UserContext.Provider>
    );
};
