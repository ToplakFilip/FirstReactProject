import React, { useState, useContext } from "react";
import ItemContext from "../../context/item-context";
import Modal from "../UI/Modal";
import Button from "../UI/Button";

const ChangeExpense = (props) => {
  const ctx = useContext(ItemContext);

  const [enteredTitle, setEnteredTitle] = useState(props.title);
  const [enteredAmount, setEnteredAmount] = useState(props.amount);
  const [enteredDate, setEnteredDate] = useState(props.date.toISOString().slice(0, 10));
  // TODO NAPRAVITI BOLJE ZATVARANJE
  const [closeWindow, setCloseWindow] = useState();

  const titleChangeHandler = (event) => {
    setEnteredTitle(event.target.value);
  };
  const amountChangeHandler = (event) => {
    setEnteredAmount(event.target.value);
  };
  const dateChangeHandler = (event) => {
    setEnteredDate(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const expenseData = {
      id: props.id,
      title: enteredTitle,
      amount: +enteredAmount,
      date: new Date(enteredDate),
    };
    ctx.changeItem({ expenseData });
    setEnteredTitle("");
    setEnteredAmount("");
    setEnteredDate("");

    setCloseWindow(props.onHideChangeExp);
  };

  return (
    <Modal>
      <form onSubmit={submitHandler}>
        <div className="new-expense__controls">
          <div className="new-expense__control">
            <label>Title</label>
            <input
              type="text"
              value={enteredTitle}
              onChange={titleChangeHandler}
            />
          </div>
          <div className="new-expense__control">
            <label>Amount</label>
            <input
              type="number"
              min="0.01"
              step="0.01"
              value={enteredAmount}
              onChange={amountChangeHandler}
            />
          </div>
          <div className="new-expense__control">
            <label>Date</label>
            <input
              type="date"
              min="2019-01-01"
              step="2022-12-31"
              value={enteredDate}
              onChange={dateChangeHandler}
            />
          </div>
        </div>
        <div className="new-expense__actions">
          <Button type="submit">Edit Expense</Button>
          <Button onClick={props.onHideChangeExp}>Cancel</Button>
        </div>
      </form>
    </Modal>
  );
};

export default ChangeExpense;
