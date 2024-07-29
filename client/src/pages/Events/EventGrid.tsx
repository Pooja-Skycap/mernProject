import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridSortModel,
} from "@mui/x-data-grid";
import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import CircularLoader from "../../components/Loader/CircularLoader";
import { EventProps, PaginationProps } from "../../Interfaces/usersInterface";

const EventGrid = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [events, setEvents] = useState<EventProps[]>([]);
  const [rowCount, setRowCount] = useState(0);

  const getStoredPaginationModel = () => {
    const saved = localStorage.getItem("paginationModel");
    return saved ? JSON.parse(saved) : { page: 0, pageSize: 5 };
  };
  const getStoredSortModel = () => {
    const saved = localStorage.getItem("sortModel");
    return saved ? JSON.parse(saved) : null;
  };
  const [paginationModel, setPaginationModel] = useState(
    getStoredPaginationModel
  );
  const [queryOptions, setQueryOptions] = useState<GridSortModel | null>(
    getStoredSortModel
  );

  const handleSortModelChange = useCallback((sortModel: GridSortModel) => {
    setQueryOptions(sortModel);
    localStorage.setItem("sortModel", JSON.stringify(sortModel));
  }, []);

  const handlePaginationModelChange = useCallback((model: PaginationProps) => {
    setPaginationModel(model);
    localStorage.setItem("paginationModel", JSON.stringify(model));
  }, []);


  const url = useMemo(() => {
    return `http://localhost:5400/events/get?offset=${paginationModel?.page}&limit=${paginationModel?.pageSize}&fieldname=${queryOptions?.[0]?.field}&sort=${queryOptions?.[0]?.sort}`;
  }, [queryOptions, paginationModel]);

  useEffect(() => {
    const getusers = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(url);
        setRowCount(data?.totalCount);
        setEvents(data.events);
      } catch (error) {
        console.log("error", error);
      } finally {
        setIsLoading(false);
      }
    };
    getusers();
  }, [url]);

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
          autoHeight
          rows={rows}
          rowCount={rowCount}
          columns={columns}
          pageSizeOptions={[5, 10, 20]}
          paginationMode="server"
          paginationModel={paginationModel}
          onPaginationModelChange={handlePaginationModelChange}
          sortingMode="server"
          onSortModelChange={handleSortModelChange}
        />
      )}
    </main>
  );
};

export default EventGrid;
