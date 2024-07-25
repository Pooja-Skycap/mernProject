import { UsersProps } from "../../Interfaces/usersInterface";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

const UsersList = ({ name, login, email, picture }: UsersProps) => {
  return (
    <>
      <Card sx={{ display: "flex", margin:2, width: 350, height:150  }} key={login.uuid}>
        <Box sx={{ display: "flex", flexDirection: "column",  maxWidth: 250 }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="h5">
              {name.first} {name.last}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              {email}
            </Typography>
          </CardContent>
          <Box
            sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}
          ></Box>
        </Box>
        <CardMedia
          component="img"
          sx={{ width: 120 }}
          image={picture.medium}
          alt={name.first}
        />
      </Card>
    </>
  );
};

export default UsersList;
