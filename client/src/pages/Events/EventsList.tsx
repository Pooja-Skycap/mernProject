import {
  useEffect,
  useState,
  useNavigate,
  GitContribution,
} from "../../utils/commonImports";
import { EventProps } from "../../Interfaces/usersInterface";
import CircularLoader from "../../components/Loader/CircularLoader";
import { getRequest } from "../../utils/services";

const EventsList = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<EventProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      try {
        const data = await getRequest("/events/get?limit=10");
        setEvents(data.events);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEvents();
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
      <div>
        <GitContribution username="Pooja-Skycap" />
      </div>
    </>
  );
};

export default EventsList;
