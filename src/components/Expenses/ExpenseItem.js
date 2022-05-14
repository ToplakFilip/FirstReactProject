import React, { useState, useContext } from "react";
import ChangeExpense from "../../components/Expenses/ChangeExpense";

import style from "./ExpenseItem.module.css";
import ExpenseDate from "./ExpenseDate";
import Card from "../UI/Card";
import Button from "../UI/Button";
import ItemContext from "../../context/item-context";

function ExpenseItem(expense) {
  const ctx = useContext(ItemContext);

  const [changeExpenseIsShown, setChangeExpenseIsShown] = useState(false);

  const showChangeExpenseHandler = () => {
    setChangeExpenseIsShown(true);
  };

  const hideChangeExpenseHandler = () => {
    setChangeExpenseIsShown(false);
  };

  const removeItemHandler = (id) => {
    ctx.removeItem(id);
  };

  return (
    <li>
      {changeExpenseIsShown && (
        <ChangeExpense
          id={expense.id}
          title={expense.title}
          amount={expense.amount}
          date={expense.date}
          onHideChangeExp={hideChangeExpenseHandler}
        />
      )}
      <Card className={style["expense-item"]}>
        <ExpenseDate date={expense.date} />
        <div className={style["expense-item_description"]}></div>
        <h2>{expense.title}</h2>
        <div>
          <Button className={style.buttonEdit} onClick={removeItemHandler.bind(null, expense.id)}>
            Remove
          </Button>
          <Button
            className={style.buttonEdit}
            onClick={showChangeExpenseHandler}
          >
            Edit
          </Button>
        </div>
        <div className={style["expense-item__price"]}>${expense.amount}</div>
      </Card>
    </li>
  );
}

export default ExpenseItem;
