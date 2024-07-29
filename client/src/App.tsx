import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import GameMain from "./pages/Game/GameMain";
import EventGrid from "./pages/Events/EventGrid";
import "./App.css";
import { PaginationProvider } from "./context/paginationContext";
// import EventTable from "./pages/Events/EventTable";

function App() {
  return (
    <Router>
      <PaginationProvider>
        <nav className="navbar">
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/game">Game</NavLink>
            </li>
          </ul>
        </nav>
        <div>
          <Routes>
            {/* <Route path="/" element={<UsersData />} /> */}
            {/* <Route path="/" element={<UsersGrid />} /> */}
            <Route path="/" element={<EventGrid />} />
            {/* <Route path="/" element={<EventTable />} /> */}

            <Route path="/game" element={<GameMain />} />
          </Routes>
        </div>
      </PaginationProvider>
    </Router>
  );
}

export default App;
