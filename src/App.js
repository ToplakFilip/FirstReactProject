import Expenses from './components/Expenses/Expenses';
import NewExpense from './components/NewExpense';

function App() {
  const expenses = [
    { id: "1", title: "Ivo", amount: 294.67, date: new Date(2021, 4, 28) },
    { id: "2", title: "Pero", amount: 66.6, date: new Date(2021, 6, 28) },
    { id: "3", title: "Karlo", amount: 2314, date: new Date(2021, 2, 28) },
    { id: "4", title: "Duro", amount: 111.1111, date: new Date(2021, 11, 28) },
  ];

  return (
    <div>
      <NewExpense/>
      <Expenses items={expenses}></Expenses>
    </div>
  );
}

export default App;
