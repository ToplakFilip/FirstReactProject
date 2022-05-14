import { useReducer } from "react";
import ItemContext from "./item-context";

const defaultItemState = {
  items: [
    { id: "1", title: "Ivo", amount: 294.67, date: new Date(2021, 4, 28) },
    { id: "2", title: "Pero", amount: 66.6, date: new Date(2021, 6, 28) },
    { id: "3", title: "Karlo", amount: 2314, date: new Date(2021, 2, 28) },
    { id: "4", title: "Duro", amount: 111.1111, date: new Date(2021, 11, 28) },
  ],
  totalAmount: 0,
};

const itemReducer = (state, action) => {
  let updatedItems;
  let updatedItemsTotalAmount;

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
  const [itemState, dispatchItemAction] = useReducer(
    itemReducer,
    defaultItemState
  );

  const addItemHandler = (item) => {
    dispatchItemAction({
      type: "ADD_ITEM",
      item: item,
    });
  };

  const changeItemHandler = (item) => {
    dispatchItemAction({
      type: "CHANGE_ITEM",
      item: item,
    });
  };

  const removeItemHandler = (id) => {
    dispatchItemAction({
      type: "REMOVE_ITEM",
      id: id,
    });
  };

  const itemContext = {
    items: itemState.items,
    totalAmount: itemState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
    changeItem: changeItemHandler,
  };

  return (
    <ItemContext.Provider value={itemContext}>
      {props.children}
    </ItemContext.Provider>
  );
};

export default ItemProvider;
