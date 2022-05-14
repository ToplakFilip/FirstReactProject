import React from "react";

const itemContext = React.createContext({
    items: [],
    totalAmount: 0,
});

export default itemContext;
