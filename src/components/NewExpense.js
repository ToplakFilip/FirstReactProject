import React, { useState } from 'react';
import ExpenseForm from './ExpenseForm';
import './NewExpense.css';



function NewExpense() {

  const [isEditing, setIsEditing] = useState(false);

  const startEditingHandler = () => {
    setIsEditing(true);
  };

  const stopEditingHandler = () => {
    setIsEditing(false);
  };

  return (
    <div className="new-expense">
      {!isEditing && (
        <button onClick={startEditingHandler}>Add new Expense</button>
      )}

      {isEditing && (
        <ExpenseForm
          onCancel={stopEditingHandler}
        />
      )}
    </div>
  );
}

export default NewExpense;
