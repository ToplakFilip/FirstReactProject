import { useReducer, useState } from "react";
import ItemContext from "./item-context";
import InitialItemLoader from "./InitialItemLoader";

const itemReducer = (state, action) => {
  let updatedItems;
  let updatedItemsTotalAmount;

  if (action.type === "INITIAL_ITEMS") {
    updatedItems = action.items;
    updatedItemsTotalAmount = action.totalAmount;

    return {
      items: updatedItems,
      totalAmount: updatedItemsTotalAmount,
      user: action.user,
    };
  }

  if (action.type === "ADD_ITEM") {
    updatedItemsTotalAmount =
      state.totalAmount + action.item.expenseData.amount;

    updatedItems = state.items.concat(action.item.expenseData);
    return {
      items: updatedItems,
      totalAmount: updatedItemsTotalAmount,
      user: state.user,
    };
  }
  if (action.type === "CHANGE_ITEM") {
    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.item.expenseData.id
    );

    updatedItemsTotalAmount =
      state.totalAmount -
      state.items[existingItemIndex].amount +
      action.item.expenseData.amount;
    updatedItems = [...state.items];
    updatedItems[existingItemIndex] = action.item.expenseData;

    return {
      items: updatedItems,
      totalAmount: updatedItemsTotalAmount,
      user: state.user,
    };
  }

  if (action.type === "REMOVE_ITEM") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingCartItemIndex];

    updatedItemsTotalAmount = state.totalAmount - existingItem.amount;
    updatedItems = state.items.filter((item) => item.id !== action.id);

    return {
      items: updatedItems,
      totalAmount: updatedItemsTotalAmount,
      user: state.user,
    };
  }
};

const ItemProvider = (props) => {
  const [itemState, dispatchItemAction] = useReducer(itemReducer, []);
  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState();

  const addInitialItemsHandler = async (user) => {
    setIsLoading(true);
    const { expenses, httpError } = await InitialItemLoader(user.user);
    setIsLoading(false);
    setHttpError(httpError);
    dispatchItemAction({
      type: "INITIAL_ITEMS",
      items: expenses.items,
      totalAmount: expenses.totalAmount,
      user: expenses.user,
    });
  };

  const addItemHandler = (item) => {
    const { newItem } = addExpenseHttp(item, itemState.user.username);
    dispatchItemAction({
      type: "ADD_ITEM",
      item: item,
    });
  };

  const changeItemHandler = (item) => {
    changeExpenseHttp(item, itemState.user.username);
    dispatchItemAction({
      type: "CHANGE_ITEM",
      item: item,
    });
  };

  const removeItemHandler = (id) => {
    removeExpenseHttp(id, itemState.user.username);
    dispatchItemAction({
      type: "REMOVE_ITEM",
      id: id,
    });
  };

  async function changeExpenseHttp(item, username) {
    const response = await fetch(
      `https://expenses-ce488-default-rtdb.europe-west1.firebasedatabase.app/expenses/${username}/${item.expenseData.id}.json`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item.expenseData),
      }
    );
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
  }

  async function addExpenseHttp(item, username) {
    const response = await fetch(
      `https://expenses-ce488-default-rtdb.europe-west1.firebasedatabase.app/expenses/${username}.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item.expenseData),
      }
    );
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    const responseData = await response.json();

    let newItem = {};
    for (const expenseKey in responseData) {
      const newItem = {
        id: expenseKey,
        title: responseData[expenseKey].title,
        amount: +responseData[expenseKey].amount,
        date: new Date(responseData[expenseKey].date),
      };
    }
    return newItem;
  }

  async function removeExpenseHttp(id, username) {
    const response = await fetch(
      `https://expenses-ce488-default-rtdb.europe-west1.firebasedatabase.app/expenses/${username}/${id}.json`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(id),
      }
    );
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
  }

  const itemContext = {
    user: itemState.user,
    items: itemState.items,
    totalAmount: itemState.totalAmount,
    isLoading: isLoading,
    httpError: httpError,
    initialItems: addInitialItemsHandler,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
    changeItem: changeItemHandler,
  };

  return (
    <ItemContext.Provider value={itemContext} delayUpdate={true}>
      {props.children}
    </ItemContext.Provider>
  );
};

export default ItemProvider;
