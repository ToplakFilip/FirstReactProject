import React from "react";

const itemContext = React.createContext({
    user: {},
    items: [],
    totalAmount: 0,
    isLoading: '',
    httpError: '',
    initialItems: (user) => {},
    addItem: (item) => {},
    removeItem: (id) => {},
    changeItem: (item) => {},
});

export default itemContext;
