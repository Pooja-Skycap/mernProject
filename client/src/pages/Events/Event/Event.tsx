import { useEffect, useState, useParams } from "../../../utils/commonImports";
import "./Event.css";
import { getRequest } from "../../../utils/services";
interface EventDetails {
  title: string;
  description: string;
}

const Event = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const [eventDetails, setEventDetails] = useState<EventDetails | null>(null);
  useEffect(() => {
    // const getEvent = async () => {
    //   const { data } = await axios.get(
    //     `http://localhost:5400/events/${eventId}`
    //   );
    //   const eachEventData = data.eachEvent;
    //   setEventDetails(eachEventData);
    // };
    // getEvent();

    const getEvent = async () => {
      try {
        const data = await getRequest(`/events/${eventId}`);
        const eachEventData = data.eachEvent;
        setEventDetails(eachEventData);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    getEvent();
  }, [eventId]);

  console.log("eventDetails", eventDetails);
  return (
    <div className="eventsData">
      <h1>{eventDetails?.title}</h1>
      <p>{eventDetails?.description}</p>
    </div>
  );
};

export default Event;
