import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";
import CircularLoader from "../../components/Loader/CircularLoader";
import { EventProps } from "../../Interfaces/usersInterface";

const EventGrid = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [events, setEvents] = useState<EventProps[]>([]);
  const [rowCount, setRowCount] = useState(0);

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });

  useEffect(() => {
    const getusers = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `http://localhost:5400/events/get?offset=${paginationModel.page}&limit=${paginationModel.pageSize}`
        );
        setRowCount(data?.totalCount);
        console.log("data", data?.events);
        setEvents(data.events);
      } catch (error) {
        console.log("error", error);
      } finally {
        setIsLoading(false);
      }
    };
    getusers();
  }, [paginationModel.page, paginationModel.pageSize]);
  const rows: GridRowsProp = events.map((event, index) => ({
    id: event._id,
    index: index + 1,
    title: event.title,
    description: event.description,
  }));
  const columns: GridColDef[] = [
    { field: "index", headerName: "Index", width: 250 },
    { field: "title", headerName: "Event Title", width: 350 },
    { field: "description", headerName: "Event Description", width: 750 },
  ];
  return (
    <main>
      <h1>Users Data using "Data Grid"</h1>
      {isLoading ? (
        <CircularLoader />
      ) : (
        <DataGrid
          //   initialState={{
          //     pagination: {
          //       paginationModel: { pageSize, page},
          //     },
          //     // sorting: {
          //     //   sortModel: [{ field: "username", sort: "asc" }],
          //     // },
          //   }}
          rows={rows}
          rowCount={rowCount}
          columns={columns}
          pageSizeOptions={[5, 10, 20]}
          paginationMode="server"
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
        />
      )}
    </main>
  );
};

export default EventGrid;
