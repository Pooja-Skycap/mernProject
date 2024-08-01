import { Badge, ListItemText, Menu, MenuItem, Typography } from "@mui/material";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import { useEffect, useState } from "react";
import axios from "axios";
import { EventTitle } from "../../Interfaces/usersInterface";
import { useNavigate } from "react-router-dom";

const Notification = () => {
  const navigate = useNavigate();
  const [notificationCount, setNotificationCount] = useState<number>(0);
  const [eventTitle, setEventTitle] = useState<EventTitle[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    const savedCount = parseInt(
      localStorage.getItem("notificationCount") || "0",
      10
    );
    setNotificationCount(savedCount);
    const eventSource = new EventSource("http://localhost:5400/events/stream");

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setEventTitle(data?.eventTitle);
      setNotificationCount(() => {
        const newCount = data?.count || 0;
        localStorage.setItem("notificationCount", newCount.toString());
        return newCount;
      });
    };

    return () => {
      eventSource.close();
    };
  }, [eventTitle]);
  console.log("eventTitle", eventTitle);

  const handleBellClick = async (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);

    try {
      await axios.post("http://localhost:5400/events/reset-notification");
      localStorage.setItem("notificationCount", "0");

      setNotificationCount(0);
    } catch (error) {
      console.error("Error resetting notifications:", error);
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (id: string | undefined) => {
    navigate(`/event/${id}`);
  };

  return (
    <div>
      <Badge badgeContent={notificationCount} color="secondary">
        <Typography
          onClick={handleBellClick}
          style={{ cursor: "pointer", color: "white" }}
        >
          <CircleNotificationsIcon />
        </Typography>
      </Badge>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {eventTitle.length === 0 ? (
          <MenuItem>No Notification</MenuItem>
        ) : (
          eventTitle.map((eachEvent) => (
            <MenuItem
              key={eachEvent.id}
              onClick={() => handleClick(eachEvent?.id)}
            >
              <ListItemText primary={eachEvent.title} />
            </MenuItem>
          ))
        )}
      </Menu>
    </div>
  );
};

export default Notification;
