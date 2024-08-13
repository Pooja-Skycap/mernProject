import { Box, CircularProgress } from "../../utils/commonImports";
const CircularLoader = () => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <CircularProgress />
    </Box>
  );
};

export default CircularLoader;
