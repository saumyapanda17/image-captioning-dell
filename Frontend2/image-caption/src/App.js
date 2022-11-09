import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeScreen from "./Screen/HomeScreen";
import Upload from "./Screen/Upload";
import Navbar from "./Components/Navbar";
import Object from "./Screen/Object";
function App() {
  return (
    <div className="appContainer">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/upload" element={<Upload />} />
          <Route path="/objectDetection" element={<Object />} />
          <Route path="/" element={<HomeScreen />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
