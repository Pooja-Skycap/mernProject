import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UsersData from "./pages/Users/UsersData";
import GameMain from "./pages/Game/GameMain";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<UsersData />} />
          <Route path="/game" element={<GameMain />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
