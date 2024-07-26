import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GameMain from "./pages/Game/GameMain";
import EventGrid from "./pages/Events/EventGrid";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          {/* <Route path="/" element={<UsersData />} /> */}
          {/* <Route path="/" element={<UsersGrid />} /> */}
          <Route path="/" element={<EventGrid/>} />

          <Route path="/game" element={<GameMain />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
