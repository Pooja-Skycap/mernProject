import { useEffect, useState } from "react";
import { EventProps } from "../../Interfaces/usersInterface";
import axios from "axios";
import CircularLoader from "../../components/Loader/CircularLoader";
import { useNavigate } from "react-router-dom";

const EventsList = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<EventProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    try {
      const fetchEvents = async () => {
        setIsLoading(true);
        const { data } = await axios.get(
          "http://localhost:5400/events/get?limit=10"
        );
        setEvents(data.events);
        console.log("data", data);
      };
      fetchEvents();
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleClick = (id: string) => {
    navigate(`/event/${id}`);
  };

  return (
    <>
      {isLoading ? (
        <CircularLoader />
      ) : (
        <ul>
          {events.map((eachEvent) => (
            <li
              key={eachEvent._id}
              onClick={() => handleClick(eachEvent._id)}
              style={{ cursor: "pointer" }}
            >
              {eachEvent.title}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default EventsList;
