import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeScreen from "./Screen/HomeScreen";
import Upload from "./Screen/Upload";
import Navbar from "./Components/Navbar";
function App() {
  return (
    <div className="appContainer">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/upload" element={<Upload />} />
          <Route path="/" element={<HomeScreen />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
