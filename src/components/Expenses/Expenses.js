import React, { useState, useContext, useEffect } from "react";
import "./Expenses.css";

import ExpensesFilter from "./ExpensesFilter";
import Card from "../UI/Card";
import ExpensesList from "./ExpensesList";
import Chart from "../Chart/Chart";
import Stats from "../Stats/Stats";
import ItemContext from "../../context/item-context";
import LineGraph from "../Chart/LineGraph";

function Expenses(props) {
  const ctx = useContext(ItemContext);

  const [filteredYear, setFilteredYear] = useState("2020");
  const filterChangeHandler = (selectedYear) => {
    setFilteredYear(selectedYear);
  };
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  useEffect(() => {
    if (props.initializeItems) {
      if (ctx.items !== undefined) {
        setFilteredExpenses(
          ctx.items.filter((expense) => {
            return expense.date.getFullYear().toString() === filteredYear;
          })
        );
      }
    }
  }, [ctx.items, filteredYear, setFilteredExpenses, props.initializeItems]);

  const chartDataPoints = [
    { label: "Jan", value: 0 },
    { label: "Feb", value: 0 },
    { label: "Mar", value: 0 },
    { label: "Apr", value: 0 },
    { label: "May", value: 0 },
    { label: "Jun", value: 0 },
    { label: "Jul", value: 0 },
    { label: "Aug", value: 0 },
    { label: "Sep", value: 0 },
    { label: "Oct", value: 0 },
    { label: "Nov", value: 0 },
    { label: "Dec", value: 0 },
  ];

  for (const expense of filteredExpenses) {
    const expenseMonth = expense.date.getMonth();
    chartDataPoints[expenseMonth].value += expense.amount;
  }

  const dataPointValues = chartDataPoints.map((dataPoint) => dataPoint.value);

  const totalSum = dataPointValues.reduce((a, b) => a + b, 0).toFixed(2);
  const highestExpense = Math.max(...dataPointValues);
  const averageCost =
    dataPointValues.reduce((a, b) => a + b, 0) / dataPointValues.length;

  const statistics = {
    totalSum: totalSum,
    highestExpense: highestExpense,
    averageCost: averageCost,
  };

  let listOfExpenses = (
    <p className="expenses-list__fallback">No Expenses found.</p>
  );

  if (ctx.httpError) {
    listOfExpenses = <p className="expenses-list__fallback">{ctx.httpError}</p>;
  } else if (ctx.isLoading) {
    listOfExpenses = <p className="expenses-list__fallback">Loading...</p>;
  } else {
    listOfExpenses = <ExpensesList items={filteredExpenses} />;
  }
  return (
    <Card className="expenses">
      <ExpensesFilter
        selected={filteredYear}
        onChangeFilter={filterChangeHandler}
      />
      <Chart dataPoints={chartDataPoints} totalSum={totalSum} />
      <Stats dataPoints={chartDataPoints} statistics={statistics} />
      {listOfExpenses}
      <LineGraph expenses={filteredExpenses}/>
    </Card>
  );
}
export default Expenses;
