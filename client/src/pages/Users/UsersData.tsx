import axios from "axios";
import { useEffect, useState } from "react";
import UsersList from "../../components/Users/UsersList";
import { UsersProps } from "../../Interfaces/usersInterface";
import "../../assets/styles/UserData.css";
import CircularLoader from "../../components/Loader/CircularLoader";
import { Pagination, Stack } from "@mui/material";
import usePagination from "../../assets/Hooks/usePagination";

const UsersData = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<UsersProps[]>([]);
  const [perPage, setPerPage] = useState(4);
  const limitOptions = [4, 8, 12, 16, 20];
  const itemPerPageHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(event.target.value, 10);
    setPerPage(value);
  };

  const count = Math.ceil(users?.length / perPage);
  const [page, setPage] = useState(1);
  const paginationData = usePagination(users, perPage);

  const handleChange = (_event: React.ChangeEvent<unknown>, page: number) => {
    setPage(page);
    paginationData.jump(page);
  };

  useEffect(() => {
    const getusers = async () => {
      try {
        setIsLoading(true);
        const usersData = await axios.get(
          "https://randomuser.me/api/?results=40"
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

  return (
    <main>
      <h1>Users Data</h1>
      {isLoading ? (
        <CircularLoader />
      ) : (
        <>
          <ul className="userslist">
            {paginationData
              ?.currentData()
              ?.map(({ name, email, login, picture }) => {
                return (
                  <UsersList
                    name={name}
                    email={email}
                    login={login}
                    picture={picture}
                    key={login.uuid}
                  />
                );
              })}
          </ul>
          Select the users per page
          <select onChange={itemPerPageHandler}>
            {limitOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
          <Stack
            spacing={2}
            sx={{
              display: "flex",
              margin: "0 auto",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Pagination
              page={page}
              count={count}
              variant="outlined"
              shape="rounded"
              onChange={handleChange}
            />
          </Stack>
        </>
      )}
    </main>
  );
};

export default UsersData;
