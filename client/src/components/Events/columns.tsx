import { createColumnHelper } from "@tanstack/react-table";
import { EventProps } from "../../Interfaces/usersInterface";

const columnHelper = createColumnHelper<EventProps>();
export const columns = [
  columnHelper.accessor("title", {
    header: "Title",
  }),
  columnHelper.accessor("description", {
    header: () => <span>Description</span>,
  }),
];
