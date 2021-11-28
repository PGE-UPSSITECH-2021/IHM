import { useContext, createContext } from "react";

export const AppContextPage = createContext(0);

export function useAppContextPage() {
    return useContext(AppContextPage);
}
