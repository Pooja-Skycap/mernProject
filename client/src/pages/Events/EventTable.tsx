import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { columns } from "../../components/Events/columns";
import { useEffect, useState } from "react";
import { EventProps } from "../../Interfaces/usersInterface";
import axios from "axios";

const EventTable = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [events, setEvents] = useState<EventProps[]>([]);
  const [rowCount, setRowCount] = useState(0);

  useEffect(() => {
    const getusers = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`http://localhost:5400/events/get`);
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
