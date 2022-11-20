import { createContext, useContext } from "react";

export const PhoneContext = createContext([]);
export const usePhoneContext = () => useContext(PhoneContext);

export const UserContext = createContext('');
export const useUserContext = () => useContext(UserContext)

export const BasketContext = createContext([]);
export const useBasketContext = () => useContext(BasketContext);