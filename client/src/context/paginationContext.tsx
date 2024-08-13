import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
  GridSortModel,
} from "../utils/commonImports";
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
  const [paginationModel, setPaginationModel] = useState<PaginationProps>({
    page: 0,
    pageSize: 5,
  });

  const [sortModel, setSortModel] = useState<GridSortModel | null>(null);

  return (
    <PaginationContext.Provider
      value={{ paginationModel, setPaginationModel, sortModel, setSortModel }}
    >
      {children}
    </PaginationContext.Provider>
  );
}
