import React, { useState } from 'react';

import Expenses from './components/Expenses/Expenses';
import NewExpense from './components/NewExpense';

const DUMMY_EXPENSES = [
  { id: "1", title: "Ivo", amount: 294.67, date: new Date(2021, 4, 28) },
  { id: "2", title: "Pero", amount: 66.6, date: new Date(2021, 6, 28) },
  { id: "3", title: "Karlo", amount: 2314, date: new Date(2021, 2, 28) },
  { id: "4", title: "Duro", amount: 111.1111, date: new Date(2021, 11, 28) },
];


function App() {
const [expenses, setExpenses] = useState(DUMMY_EXPENSES);

  const addExpenseHandler = (expense) => {
    setExpenses((prevExpenses) => {
      return [expense, ...prevExpenses];
    });
  };

  return (
    <div>
      <NewExpense onAddExpense={addExpenseHandler} />
      <Expenses items={expenses} />
    </div>
  );
}

export default App;
