import "./App.css";
import {
  Router,
  Routes,
  Route,
  NavLink,
  useState,
  Navigate,
} from "./utils/commonImports";
import "./App.css";

import Event from "./pages/Events/Event/Event";
// import EventsList from "./pages/Events/EventsList";
// import GameMain from "./pages/Game/GameMain";
// import UsersData from "./pages/Users/UsersData";
// import UsersGrid from "./pages/Users/DataGrid/UsersGrid";
import EventGrid from "./pages/Events/EventGrid";
import { PaginationProvider } from "./context/paginationContext";
//import Counter from "./components/Counter/Counter";
//import Chats from "./pages/Chats/Chats";
import CreateEvent from "./pages/Events/Create/CreateEvent";
//import Notification from "./components/Notifications/Notification";
import LargeFileUpload from "./pages/FileUpload/LargeFileUpload";
//import Video from "./pages/FileUpload/Video";
//import Charts from "./pages/Charts/Charts";
//import ReactCharts from "./pages/Charts/ReactCharts";
import ModalExample from "./pages/Modal/ModalExample";
import UsersWithActionButton from "./pages/Users/DataGrid/UsersWithActionButton";
//import InstantSearch from "./pages/Search/InstantSearch";
import SearchComponent from "./pages/Search/SearchComponent";

interface PrivateRouteProps {
  children: React.ReactNode;
}

function App() {
  const [isloggedIn, setIsLoggedIn] = useState(false);
  console.log("isl", isloggedIn);

  const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    if (!isloggedIn) {
      return <Navigate to={{ pathname: "/" }} />;
    }
    return children;
  };

  const IsLoggedIn: React.FC<PrivateRouteProps> = ({ children }) => {
    if (isloggedIn) {
      return <Navigate to={{ pathname: "/event" }} />;
    }
    return children;
  };

  const handleClick = () => {
    setIsLoggedIn(true);
  };

  // const PrivateRoutes = (
  //   <>
  //     <Routes>
  //       <Route path="/users" element={<UsersWithActionButton />} />
  //       <Route path="/modalexample" element={<ModalExample />} />
  //       <Route path="/fileupload" element={<LargeFileUpload />} />
  //       {/* <Route path="/" element={<EventsList />} />
  //           <Route path="/event/:eventId" element={<Event />} />
  //           <Route path="/game" element={<GameMain />} />
  //           <Route path="/userdata" element={<UsersData />} />
  //           <Route path="/" element={<UsersGrid />} />
  //           <Route path="/" element={<EventGrid />} />
  //           <Route path="/counter" element={<Counter />} />
  //           <Route path="/socket" element={<Chats />} />
  //           <Route path="/charts" element={<ReactCharts />} />
  //           <Route path="/video" element={<Video />} />
  //           <Route path="/event" element={<CreateEvent />} /> */}
  //     </Routes>
  //   </>
  // );

  return (
    <Router>
      <PaginationProvider>
        <nav className="navbar">
          {isloggedIn ? (
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
            </li> 
            <li>
              <NavLink to="/charts">React Charts</NavLink>
            </li>*/}

              <li>
                <NavLink to="/modalexample">ModalExample</NavLink>
              </li>
              <li>
                <NavLink to="/fileupload">Large File Upload</NavLink>
              </li>
              <li>
                <NavLink to="/users">Users</NavLink>
              </li>
              {/* <Notification /> */}
            </ul>
          ) : (
            <ul>
              <li>
                <NavLink to="/eventgrid">EventGrid</NavLink>
              </li>
              <li>
                <NavLink to="/users">Users</NavLink>
              </li>
              <li>
                <NavLink to="/users">Users</NavLink>
              </li>

              <li>
                <NavLink to="/instantsearch">InstantSearch</NavLink>
              </li>
            </ul>
          )}
        </nav>
        <div>
          <Routes>
            <Route
              path="/"
              element={
                <IsLoggedIn>
                  <button onClick={handleClick}>Sign In please</button>
                </IsLoggedIn>
              }
            />
            <Route path="/users" element={<UsersWithActionButton />} />
            <Route path="/eventgrid" element={<EventGrid />} />
            <Route path="/instantsearch" element={<SearchComponent />} />

            <Route path="/event/:eventId" element={<Event />} />
            <Route
              path="/event"
              element={
                <PrivateRoute>
                  <CreateEvent />
                </PrivateRoute>
              }
            />
            <Route
              path="/modalexample"
              element={
                <PrivateRoute>
                  <ModalExample />
                </PrivateRoute>
              }
            />
            <Route
              path="/fileupload"
              element={
                <PrivateRoute>
                  <LargeFileUpload />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </PaginationProvider>
    </Router>
  );
}

export default App;
