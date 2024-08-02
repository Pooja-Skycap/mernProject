import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
//import GameMain from "./pages/Game/GameMain";
//import EventGrid from "./pages/Events/EventGrid";
import "./App.css";
import { PaginationProvider } from "./context/paginationContext";
//import Counter from "./components/Counter/Counter";
import UsersData from "./pages/Users/UsersData";
import Chats from "./pages/Chats/Chats";
import EventsList from "./pages/Events/EventsList";
import Event from "./pages/Events/Event/Event";
import Notification from "./components/Notifications/Notification";
import LargeFileUpload from "./pages/FileUpload/LargeFileUpload";
import CreateEvent from "./pages/Events/Create/CreateEvent";
//import FileUpload from "./pages/FileUpload/FileUpload";
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
              <NavLink to="/event">Create Event</NavLink>
            </li>
            <li>
              <NavLink to="/userdata">User Data</NavLink>
            </li>
            <li>
              <NavLink to="/fileupload">File Upload</NavLink>
            </li>

            {/* <li>
              <NavLink to="/socket">Socket</NavLink>
            </li>
            <li>
              <NavLink to="/fileupload">File Upload</NavLink>
            </li>
            <li>
              <NavLink to="/counter">Counter</NavLink>
            </li> */}
            <Notification />
          </ul>
        </nav>
        <div>
          <Routes>
            <Route path="/userdata" element={<UsersData />} />
            <Route path="/" element={<EventsList />} />
            <Route path="/event" element={<CreateEvent />} />

            <Route path="/event/:eventId" element={<Event />} />
            <Route path="/fileupload" element={<LargeFileUpload />} />
            {/* <Route path="/" element={<UsersGrid />} /> */}
            {/* <Route path="/" element={<EventGrid />} /> */}
            <Route path="/socket" element={<Chats />} />
            {/* <Route path="/" element={<EventTable />} /> */}
            {/* 
            <Route path="/game" element={<GameMain />} />
            <Route path="/fileupload" element={<FileUpload />} />
            <Route path="/counter" element={<Counter />} /> */}
          </Routes>
        </div>
      </PaginationProvider>
    </Router>
  );
}

export default App;
