import React, { PropsWithChildren } from "react";

const Context = React.createContext({});

export default function ProductDetailsProvider({ children }: PropsWithChildren) {
    return <Context.Provider value={{}}>{children}</Context.Provider>;
}

export const useProductDetails = () => {
    const context = React.useContext(Context);
    if (!context) {
        throw new Error("useProductDetails must be used within a ProductDetailsProvider");
    }
    return context;
};
