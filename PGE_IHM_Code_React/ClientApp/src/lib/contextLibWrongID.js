import { useContext, createContext } from "react";

export const AppContextWrongID = createContext(null);

export function useAppContextWrongID() {
    return useContext(AppContextWrongID);
}
