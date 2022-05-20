const InitialItemLoader = async (userData) => {
  // const [expenses, setExpenses] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  // const [httpError, setHttpError] = useState();
  let items = [];
  let totalAmount = 0;
  let user = {};
  let httpError = "";

  const fetchExpenses = async () => {
    const response = await fetch(
      `https://expenses-ce488-default-rtdb.europe-west1.firebasedatabase.app/expenses/${userData}.json`,
      { method: "GET", body: JSON.stringify() }
    );
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const responseData = await response.json();

    for (const expenseKey in responseData) {
      if (expenseKey !== "password") {
        items.push({
          id: expenseKey,
          title: responseData[expenseKey].title,
          amount: +responseData[expenseKey].amount,
          date: new Date(responseData[expenseKey].date),
        });
        totalAmount += responseData[expenseKey].amount;
      }
    }
    user = {
      username: userData,
      password: responseData["password"],
    };
    const expenses = { items, totalAmount, user };
    return {
      expenses,
      httpError,
    };
  };

  try {
    return await fetchExpenses();
  } catch (error) {
    httpError = error.message;
  }
};

export default InitialItemLoader;
