import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";

import "./App.css";

// import Event from "./pages/Events/Event/Event";
// import EventsList from "./pages/Events/EventsList";
// import GameMain from "./pages/Game/GameMain";
//import UsersData from "./pages/Users/UsersData";
//import UsersGrid from "./pages/Users/DataGrid/UsersGrid";
//import EventGrid from "./pages/Events/EventGrid";
import { PaginationProvider } from "./context/paginationContext";
//import Counter from "./components/Counter/Counter";
//import Chats from "./pages/Chats/Chats";
import CreateEvent from "./pages/Events/Create/CreateEvent";
import Notification from "./components/Notifications/Notification";
import LargeFileUpload from "./pages/FileUpload/LargeFileUpload";
import Video from "./pages/FileUpload/Video";
//import Charts from "./pages/Charts/Charts";
import ReactCharts from "./pages/Charts/ReactCharts";

function App() {
  return (
    <Router>
      <PaginationProvider>
        <nav className="navbar">
          <ul>
            <li>
              <NavLink to="/event">Create Event</NavLink>
            </li>
            {/*
            <li>
              <NavLink to="/">Events Lists</NavLink>
            </li>
            <li>
              <NavLink to="/game">Game</NavLink>
            </li>
            <li>
              <NavLink to="/userdata">User Data</NavLink>
            </li>
            <li>
              <NavLink to="/">Events Grid</NavLink>
            </li>
            <li>
              <NavLink to="/counter">Counter</NavLink>
            </li>
            <li>
              <NavLink to="/socket">Socket</NavLink>
            </li> */}
            <li>
              <NavLink to="/charts">React Charts</NavLink>
            </li>
            <li>
              <NavLink to="/fileupload">Large File Upload</NavLink>
            </li>
            <li>
              <NavLink to="/video">Video Streaming</NavLink>
            </li>
            <Notification />
          </ul>
        </nav>
        <div>
          <Routes>
            {/* <Route path="/" element={<EventsList />} />
            <Route path="/event/:eventId" element={<Event />} />
            <Route path="/game" element={<GameMain />} />
            <Route path="/userdata" element={<UsersData />} />
            <Route path="/" element={<UsersGrid />} />
            <Route path="/" element={<EventGrid />} />
            <Route path="/counter" element={<Counter />} />
            <Route path="/socket" element={<Chats />} />
            */}
            <Route path="/event" element={<CreateEvent />} />
            <Route path="/charts" element={<ReactCharts />} />

            <Route path="/fileupload" element={<LargeFileUpload />} />
            <Route path="/video" element={<Video />} />
          </Routes>
        </div>
      </PaginationProvider>
    </Router>
  );
}

export default App;
