"use client";

import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

interface User {
    id: number;
    email: string;
    [key: string]: any; // 他のプロパティも追加可能
}

interface AuthContextProps {
    token: string | null;
    user: User | null;
    login: (token: string, user: User) => void; // user の型を User に変更
    logout: () => void;
    isInitialized: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null); // 型を User | null に変更
    const [isInitialized, setIsInitialized] = useState(false);

    const router = useRouter();

    useEffect(() => {
        const storedToken = localStorage.getItem("authToken");
        const storedUser = localStorage.getItem("authUser");
        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser) as User); // 明示的に型を指定
        }
        setIsInitialized(true);
    }, []);

    const login = (token: string, user: User) => { // user の型を User に変更
        setToken(token);
        setUser(user);
        localStorage.setItem("authToken", token);
        localStorage.setItem("authUser", JSON.stringify(user));
        router.push("/exhibitor/exhibitions");
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("authToken");
        localStorage.removeItem("authUser");
        router.push("/exhibitor/login");
    };

    return (
        <AuthContext.Provider value={{ token, user, login, logout, isInitialized }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
