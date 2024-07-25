import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";
import "../../../assets/styles/UserData.css";
import { UsersProps } from "../../../Interfaces/usersInterface";
import CircularLoader from "../../../components/Loader/CircularLoader";

const UsersGrid = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<UsersProps[]>([]);

  useEffect(() => {
    const getusers = async () => {
      try {
        setIsLoading(true);
        const usersData = await axios.get(
          "https://randomuser.me/api/?results=20"
        );
        setUsers(usersData?.data?.results);
      } catch (error) {
        console.log("error", error);
      } finally {
        setIsLoading(false);
      }
    };
    getusers();
  }, []);
  const rows: GridRowsProp = users.map((user, index) => ({
    id: user.login.uuid,
    index: index + 1,
    thmubnail: <img src={user.picture.medium} />,
    userId: user.login.uuid,
    username: user.name.first + " " + user.name.last,
    useremail: user.email,
  }));
  const columns: GridColDef[] = [
    { field: "index", headerName: "Index", width: 250 },
    {
      field: "thmubnail",
      headerName: "Thumbnail",
      width: 250,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          {params.value}
        </div>
      ),
    },
    { field: "userId", headerName: "User Id", width: 350 },
    { field: "username", headerName: "User Name", width: 250 },
    { field: "useremail", headerName: "User Email", width: 250 },
  ];
  return (
    <main>
      <h1>Users Data using "Data Grid"</h1>
      {isLoading ? (
        <CircularLoader />
      ) : (
        <DataGrid
          initialState={{
            pagination: {
              paginationModel: { pageSize: 5, page: 0 },
            },
            sorting: {
              sortModel: [{ field: "username", sort: "asc" }],
            },
          }}
          rows={rows}
          columns={columns}
          pageSizeOptions={[5, 10, 20]}
        />
      )}
    </main>
  );
};

export default UsersGrid;
