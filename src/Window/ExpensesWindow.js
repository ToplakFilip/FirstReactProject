import React, { useContext, useState, useEffect } from "react";

import Expenses from "../components/Expenses/Expenses";
import NewExpense from "../components/NewExpense";
import ItemContext from "../context/item-context";

const ExpensesWindow = (props) => {
  const [itemsAreInitialized, setItemsAreInitialized] = useState(false);
  const itemCtx = useContext(ItemContext);

  useEffect(() => {
    if (props.getInitialItems) {
      itemCtx.initialItems({ user: localStorage.getItem("username") });
      setItemsAreInitialized(true);
    }
    return () => {};
  }, []);

  return (
    <React.Fragment>
      <NewExpense />
      <Expenses initializeItems={itemsAreInitialized} />
    </React.Fragment>
  );
};

export default ExpensesWindow;
