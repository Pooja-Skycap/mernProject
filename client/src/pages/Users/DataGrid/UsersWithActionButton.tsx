import {
  Box,
  Button,
  useState,
  DataGrid,
  GridColDef,
  EditIconButton,
} from "../../../utils/commonImports";

interface users {
  id: number;
  name: string;
  email: string;
  role: string;
}
const UsersWithActionButton = () => {
  const [selectedUser, setSelectedUser] = useState<users>({
    id: 0,
    name: "",
    email: "",
    role: "",
  });

  const rows = [
    { id: 1, name: "John Doe", email: "john.doe@example.com", role: "Admin" },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      role: "User",
    },
  ];

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "role", headerName: "Role", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          startIcon={<EditIconButton />}
          onClick={() => handleEdit(params.row)}
        >
          Edit
        </Button>
      ),
    },
  ];

  const handleEdit = (user: users) => {
    // let usernewdata = {
    //   ...user,
    //   name,
    // };
    setSelectedUser({ ...user, name: "joe" });
    console.log(" user:", selectedUser);
  };

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[5, 10, 20]}
        checkboxSelection
      />
    </Box>
  );
};

export default UsersWithActionButton;
