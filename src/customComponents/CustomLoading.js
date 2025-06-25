import { Backdrop } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const CustomLoading = ({ open }) => {
  return (
    <Backdrop
      sx={(theme) => ({
        color: theme.palette.primary.main,
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
      })}
      open={open}
      // onClick={handleClose}
    >
      <CircularProgress color="success" />
    </Backdrop>
  );
};

export default CustomLoading;
