import ExpenseItem from './ExpenseItem';
import './ExpensesList.css';

function ExpensesList(filteredExpenses) {
  if (filteredExpenses.items.length === 0) {
    return <p className="expenses-list__fallback">No Expenses found.</p>;
  }

  return (
    <ul className="expenses-list">
      {filteredExpenses.items.map((expense) => (
        <ExpenseItem
          key={expense.id}
          id={expense.id}
          title={expense.title}
          amount={expense.amount}
          date={expense.date}
        />
      ))}
    </ul>
  );
}

export default ExpensesList;