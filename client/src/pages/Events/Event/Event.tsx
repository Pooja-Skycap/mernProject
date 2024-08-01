import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Event.css";
interface EventDetails {
  title: string;
  description: string;
}

const Event = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const [eventDetails, setEventDetails] = useState<EventDetails | null>(null);
  useEffect(() => {
    const getEvent = async () => {
      const { data } = await axios.get(
        `http://localhost:5400/events/${eventId}`
      );
      const eachEventData = data.eachEvent;
      setEventDetails(eachEventData);
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
