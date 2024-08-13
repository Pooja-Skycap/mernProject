import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useEffect,
  useState,
} from "../../utils/commonImports";
import { columns } from "../../components/Events/columns";
import { EventProps } from "../../Interfaces/usersInterface";
import { getRequest } from "../../utils/services";

const EventTable = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [events, setEvents] = useState<EventProps[]>([]);
  const [rowCount, setRowCount] = useState(0);

  useEffect(() => {
    const getusers = async () => {
      setIsLoading(true);
      try {
        const data = await getRequest("/events/get?limit=10");
        setEvents(data.events);
        setRowCount(data?.totalCount);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getusers();
  }, []);

  console.log("columns", columns);
  console.log("rowCount", rowCount);
  console.log("isLoading", isLoading);
  const tableInstance = useReactTable({
    columns,
    data: events,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });
  console.log("tableInstance", tableInstance);

  return (
    <table>
      <thead>
        <tr>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td></td>
        </tr>
      </tbody>
    </table>
  );
};

export default EventTable;
