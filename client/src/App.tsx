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
import Counter from "./components/Counter/Counter";
import UsersData from "./pages/Users/UsersData";
import Chats from "./pages/Chats/Chats";
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
            <li>
              <NavLink to="/userdata">User Data</NavLink>
            </li>
            <li>
              <NavLink to="/socket">Socket</NavLink>
            </li>
            <li>
              <NavLink to="/counter">Counter</NavLink>
            </li>
          </ul>
        </nav>
        <div>
          <Routes>
            <Route path="/userdata" element={<UsersData />} />
            {/* <Route path="/" element={<UsersGrid />} /> */}
            <Route path="/" element={<EventGrid />} />
            <Route path="/socket" element={<Chats />} />

            {/* <Route path="/" element={<EventTable />} /> */}

            <Route path="/game" element={<GameMain />} />
            <Route path="/counter" element={<Counter />} />
          </Routes>
        </div>
      </PaginationProvider>
    </Router>
  );
}

export default App;
