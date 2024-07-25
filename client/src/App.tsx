import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GameMain from "./pages/Game/GameMain";
import UsersGrid from "./pages/Users/DataGrid/UsersGrid";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          {/* <Route path="/" element={<UsersData />} /> */}
          <Route path="/" element={<UsersGrid />} />
          <Route path="/game" element={<GameMain />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
