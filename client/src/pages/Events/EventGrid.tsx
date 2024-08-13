import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridSortModel,
  useCallback,
  useEffect,
  useState,
} from "../../utils/commonImports";
import CircularLoader from "../../components/Loader/CircularLoader";
import { EventProps, PaginationProps } from "../../Interfaces/usersInterface";
import { usePagination } from "../../context/paginationContext";
import Error from "../../components/Error/Error";
import { getRequest } from "../../utils/services";

const EventGrid = () => {
  const { paginationModel, setPaginationModel, sortModel, setSortModel } =
    usePagination();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [events, setEvents] = useState<EventProps[]>([]);
  const [rowCount, setRowCount] = useState(0);

  const handleSortModelChange = useCallback(
    (sortModel: GridSortModel) => {
      setSortModel(sortModel);
    },
    [setSortModel]
  );

  const handlePaginationModelChange = useCallback(
    (paginationModel: PaginationProps) => {
      setPaginationModel(paginationModel);
    },
    [setPaginationModel]
  );

  // const url = useMemo(() => {
  //   return getRequest(`/events/get?offset=${paginationModel.page}&limit=${paginationModel.pageSize}&fieldname=${sortModel?.[0]?.field}&sort=${sortModel?.[0]?.sort}`)
  // }, [paginationModel, sortModel]);

  useEffect(() => {
    const getusers = async () => {
      try {
        setIsLoading(true);
        const data = await getRequest(
          `/events/get?offset=${paginationModel.page}&limit=${paginationModel.pageSize}&fieldname=${sortModel?.[0]?.field}&sort=${sortModel?.[0]?.sort}`
        );
        setRowCount(data?.totalCount);
        setEvents(data.events);
      } catch (error) {
        console.log("error", error);
        setIsError(true);
        if (error) {
          setErrorMessage("Network Issue");
        }
      } finally {
        setIsLoading(false);
      }
    };
    getusers();
  }, [paginationModel, sortModel]);

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
      ) : isError ? (
        <Error error={errorMessage} />
      ) : (
        <DataGrid
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
