import { styled, Typography } from "@mui/material";

const CustomHeading = styled(Typography)(({ theme }) => ({
  '&.MuiTypography-root': {
    color: theme.palette.success.main,
  }
}))

export default CustomHeading
