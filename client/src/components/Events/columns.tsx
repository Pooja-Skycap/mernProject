import { createColumnHelper } from "../../utils/commonImports";
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
