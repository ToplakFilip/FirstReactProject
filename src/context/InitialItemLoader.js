import { useState, useEffect } from "react";

const useInitialItemLoader = () => {
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const fetchExpenses = async () => {
      setIsLoading(true);
      const response = await fetch(
        "https://expenses-ce488-default-rtdb.europe-west1.firebasedatabase.app/expenses.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseData = await response.json();

      let items = [];
      let totalAmount = 0;

      for (const expenseKey in responseData) {
        items.push({
          id: expenseKey,
          title: responseData[expenseKey].title,
          amount: +responseData[expenseKey].amount,
          date: new Date(responseData[expenseKey].date),
        });
        totalAmount += responseData[expenseKey].amount;
      }
      setExpenses({ items, totalAmount });
      setIsLoading(false);
    };

    fetchExpenses().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
    return (() => {})
  }, []);

  return {
    expenses,
    isLoading,
    httpError
  };
};

export default useInitialItemLoader;
