import { useContext, createContext } from "react";

export const AppContextAuth = createContext(null);

export function useAppContextAuth() {
    return useContext(AppContextAuth);
}
