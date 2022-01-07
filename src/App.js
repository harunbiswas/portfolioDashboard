// External Imports
import { BrowserRouter } from "react-router-dom";
import "./App.scss";
import Header from "./Components/Header/Header";
// Internal Imports
import Root from "./Components/Router/Root";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Root />
      </BrowserRouter>
    </div>
  );
}

export default App;
