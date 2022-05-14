import React from "react";

import Expenses from "../components/Expenses/Expenses";
import NewExpense from "../components/NewExpense";
import ItemProvider from "../context/ItemProvider";

const ExpensesWindow = () => {
  return (
    <ItemProvider>
      <NewExpense />
      <Expenses />
    </ItemProvider>
  );
};

export default ExpensesWindow;
