import { useReducer, useEffect } from "react";
import ItemContext from "./item-context";
import useInitialItemLoader from "./InitialItemLoader";

const itemReducer = (state, action) => {
  let updatedItems;
  let updatedItemsTotalAmount;

  if (action.type === "INITIAL_ITEMS") {
    updatedItems = action.items.items;
    updatedItemsTotalAmount = action.totalAmount;
  }

  if (action.type === "ADD_ITEM") {
    updatedItemsTotalAmount =
      state.totalAmount + action.item.expenseData.amount;

    updatedItems = state.items.concat(action.item.expenseData);
    return {
      items: updatedItems,
      totalAmount: updatedItemsTotalAmount,
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
  }

  if (action.type === "REMOVE_ITEM") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingCartItemIndex];

    updatedItemsTotalAmount = state.totalAmount - existingItem.amount;
    updatedItems = state.items.filter((item) => item.id !== action.id);
  }

  return {
    items: updatedItems,
    totalAmount: updatedItemsTotalAmount,
  };
};

const ItemProvider = (props) => {
  const { expenses, isLoading, httpError } = useInitialItemLoader();

  useEffect(() => {
    addInitialItemsHandler(expenses);
  }, [expenses]);

  const [itemState, dispatchItemAction] = useReducer(itemReducer, []);

  const addInitialItemsHandler = (items, totalAmount) => {
    dispatchItemAction({
      type: "INITIAL_ITEMS",
      items: items,
      totalAmount: totalAmount,
    });
  };

  const addItemHandler = (item) => {
    addExpenseHandler(item);
    dispatchItemAction({
      type: "ADD_ITEM",
      item: item,
    });
  };

  const changeItemHandler = (item) => {
    changeExpenseHandler(item);
    dispatchItemAction({
      type: "CHANGE_ITEM",
      item: item,
    });
  };

  const removeItemHandler = (id) => {
    removeExpenseHandler(id);
    dispatchItemAction({
      type: "REMOVE_ITEM",
      id: id,
    });
  };

  async function changeExpenseHandler(item) {
    const response = await fetch(
      `https://expenses-ce488-default-rtdb.europe-west1.firebasedatabase.app/expenses/${item.expenseData.id}.json`,
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

  async function addExpenseHandler(item) {
    const response = await fetch(
      "https://expenses-ce488-default-rtdb.europe-west1.firebasedatabase.app/expenses.json",
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
  }

  async function removeExpenseHandler(id) {
    const response = await fetch(
      `https://expenses-ce488-default-rtdb.europe-west1.firebasedatabase.app/expenses/${id}.json`,
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
    items: itemState.items,
    totalAmount: itemState.totalAmount,
    isLoading: isLoading,
    httpError: httpError,
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
