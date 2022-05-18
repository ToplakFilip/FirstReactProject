import { useState, useEffect } from "react";

const useInsertItemRest = () => {
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  async function addOrChangeExpenseHandler(item) {
    const response = await fetch(
        "https://expenses-ce488-default-rtdb.europe-west1.firebasedatabase.app/expenses.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(item),
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
    }
}


export default useInsertItemRest;
