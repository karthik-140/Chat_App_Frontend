import { styled, InputLabel } from "@mui/material";

const CustomLabel = styled(InputLabel)(({ theme }) => ({
  '&.MuiInputLabel-root': {
    color: theme.palette.success.light
  }
}))

export default CustomLabel
