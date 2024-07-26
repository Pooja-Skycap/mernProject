import { Box, Card, CardContent, Typography } from "@mui/material";

interface EventsProps {
  title: string;
  description: string;
  id: string;
}

const EventsList = ({ title, description, id }: EventsProps) => {
  return (
    <>
      <Card
        sx={{ display: "flex", margin: 2, width: 350, height: 150 }}
        key={id}
      >
        <Box sx={{ display: "flex", flexDirection: "column", maxWidth: 250 }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="h5">
              {title}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              {description}
            </Typography>
          </CardContent>
          <Box
            sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}
          ></Box>
        </Box>
      </Card>
    </>
  );
};

export default EventsList;
