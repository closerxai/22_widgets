import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

interface NavigationContextType {
    currentPath: string;
    navigate: (path: string) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currentPath, setCurrentPath] = useState('home');

    const navigate = useCallback((path: string) => {
        setCurrentPath(path);
        // In a real environment, we might want to handle browser history here
        // but for the IIFE/Shadow DOM widget, we keep it state-driven as requested.
    }, []);

    return (
        <NavigationContext.Provider value={{ currentPath, navigate }}>
            {children}
        </NavigationContext.Provider>
    );
};

export const useNavigation = () => {
    const context = useContext(NavigationContext);
    if (context === undefined) {
        throw new Error('useNavigation must be used within a NavigationProvider');
    }
    return context;
};
