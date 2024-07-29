import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useContext,
    useEffect,
    useState,
  } from "react";
  import { GridSortModel } from "@mui/x-data-grid";
  import { PaginationProps } from "../Interfaces/usersInterface"; // Ensure this import is correct
  
  interface PaginationContextType {
    paginationModel: PaginationProps;
    setPaginationModel: Dispatch<SetStateAction<PaginationProps>>;
    sortModel: GridSortModel | null;
    setSortModel: Dispatch<SetStateAction<GridSortModel | null>>;
  }
  
  const PaginationContext = createContext<PaginationContextType | undefined>(
    undefined
  );
  
  export function usePagination() {
    const context = useContext(PaginationContext);
    if (context === undefined) {
      throw new Error("usePagination must be used within a PaginationProvider");
    }
    return context;
  }
  
  interface PaginationProviderProps {
    children: ReactNode;
  }
  
  export function PaginationProvider({ children }: PaginationProviderProps) {
    const [paginationModel, setPaginationModel] = useState<PaginationProps>(() => {
      const saved = localStorage.getItem("paginationModel");
      return saved ? JSON.parse(saved) : { page: 0, pageSize: 5 };
    });
  
    const [sortModel, setSortModel] = useState<GridSortModel | null>(() => {
      const saved = localStorage.getItem("sortModel");
      return saved ? JSON.parse(saved) : null;
    });
  
    useEffect(() => {
      localStorage.setItem("paginationModel", JSON.stringify(paginationModel));
    }, [paginationModel]);
  
    useEffect(() => {
      localStorage.setItem("sortModel", JSON.stringify(sortModel));
    }, [sortModel]);
  
    return (
      <PaginationContext.Provider
        value={{ paginationModel, setPaginationModel, sortModel, setSortModel }}
      >
        {children}
      </PaginationContext.Provider>
    );
  }
  