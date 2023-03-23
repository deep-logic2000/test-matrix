
import { useAppContext } from "./hooks/useAppContext";
import "./App.css";

import InputForm from "./components/InputForm/InputForm";
import Table from "./components/Table/Table";


function App() {
  const { rows, rowsQuantity, handleFormSubmit, addRow } = useAppContext();

  return (
    <div className="App">
      <InputForm handleFormSubmit={handleFormSubmit} />
      {rows.length ? (
        <>
          <div className="table-wrapper">
            <Table data={rows} rowsQuantity={rowsQuantity} />
          </div>
          <button onClick={addRow} className="btn-add">
            Add row
          </button>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default App;
